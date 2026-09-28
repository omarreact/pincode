const DEFAULT_BASE_URL = "https://api.porichoybd.com";
const DEFAULT_NID_PATH = "/api/v2/verifications/autofill";
const DEFAULT_BIRTH_PATH = "/api/v1/verifications/autofill";

class PorichoyError extends Error {
  constructor(message, status = 502, code = "PORICHOY_ERROR", upstreamStatus = null, upstreamBody = null) {
    super(message);
    this.name = "PorichoyError";
    this.status = status;
    this.code = code;
    this.upstreamStatus = upstreamStatus;
    this.upstreamBody = upstreamBody;
  }
}

function apiKey() {
  return (
    process.env.PORICHOY_API_KEY ||
    process.env.PORICHOY_GOV_BD_API_KEY ||
    ""
  ).trim();
}

function normalizeBaseUrl() {
  const raw = (process.env.PORICHOY_BASE_URL || DEFAULT_BASE_URL).trim().replace(/\/+$/, "");
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new PorichoyError("Porichoy base URL is invalid.", 503, "PORICHOY_BAD_CONFIG");
  }
  if (parsed.protocol !== "https:") {
    throw new PorichoyError("Porichoy production URL must use HTTPS.", 503, "PORICHOY_BAD_CONFIG");
  }
  return parsed.toString().replace(/\/$/, "");
}

function normalizePath(value, fallback) {
  const raw = String(value || fallback).trim();
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function parseBody(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function requestPorichoy(path, payload) {
  const key = apiKey();
  if (!key) {
    throw new PorichoyError(
      "Porichoy production API key is not configured on this deployment.",
      503,
      "PORICHOY_NOT_CONFIGURED"
    );
  }

  const baseUrl = normalizeBaseUrl();
  const endpoint = `${baseUrl}${path}`;
  const timeoutMs = Math.max(3000, Number(process.env.PORICHOY_TIMEOUT_MS || 20000));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "x-api-key": key
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal
    });

    const rawText = await response.text();
    const body = parseBody(rawText);
    const durationMs = Date.now() - startedAt;

    if (!response.ok) {
      const publicMessage =
        response.status === 401 || response.status === 403
          ? "Porichoy rejected the configured production credential."
          : response.status === 429
            ? "Porichoy rate limit reached."
            : response.status >= 500
              ? "Porichoy is temporarily unavailable."
              : "Porichoy returned an unsuccessful response.";

      throw new PorichoyError(
        publicMessage,
        response.status === 429 ? 429 : response.status >= 500 ? 503 : 502,
        "PORICHOY_UPSTREAM_ERROR",
        response.status,
        body
      );
    }

    return {
      endpoint,
      httpStatus: response.status,
      durationMs,
      body
    };
  } catch (error) {
    if (error instanceof PorichoyError) throw error;
    if (error && error.name === "AbortError") {
      throw new PorichoyError("Porichoy request timed out.", 504, "PORICHOY_TIMEOUT");
    }
    throw new PorichoyError("Could not reach Porichoy production API.", 503, "PORICHOY_NETWORK_ERROR");
  } finally {
    clearTimeout(timer);
  }
}

function porichoyConfigured() {
  return Boolean(apiKey());
}

function verifyNid(nidNumber, dateOfBirth) {
  const path = normalizePath(process.env.PORICHOY_NID_PATH, DEFAULT_NID_PATH);
  return requestPorichoy(path, {
    nidNumber,
    dateOfBirth,
    englishTranslation: true
  });
}

function verifyBirth(birthRegistrationNumber, dateOfBirth) {
  const path = normalizePath(process.env.PORICHOY_BIRTH_PATH, DEFAULT_BIRTH_PATH);
  return requestPorichoy(path, {
    birthRegistrationNumber,
    dateOfBirth
  });
}

module.exports = {
  DEFAULT_BIRTH_PATH,
  DEFAULT_NID_PATH,
  PorichoyError,
  porichoyConfigured,
  verifyBirth,
  verifyNid
};
