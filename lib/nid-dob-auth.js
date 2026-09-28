const crypto = require("crypto");

const COOKIE_NAME = "pincode_nid_dob_session";
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const PASSWORD_SALT = "3F0_R1HPdxhc-T8CE9pTbQ";
const PASSWORD_HASH = "w3Wyg8KfnHzEeeFAeUt8ZarEkXUoiorrj4VJuUQx3Kw";
const PBKDF2_ITERATIONS = 210000;

function b64url(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function verifyPassword(password) {
  const supplied = String(password || "");
  const envPassword = process.env.NID_DOB_PASSWORD;

  if (envPassword) {
    const suppliedDigest = crypto.createHash("sha256").update(supplied).digest();
    const expectedDigest = crypto.createHash("sha256").update(envPassword).digest();
    return crypto.timingSafeEqual(suppliedDigest, expectedDigest);
  }

  const salt = Buffer.from(PASSWORD_SALT, "base64url");
  const derived = crypto.pbkdf2Sync(
    supplied,
    salt,
    PBKDF2_ITERATIONS,
    32,
    "sha256"
  );
  return safeEqual(b64url(derived), PASSWORD_HASH);
}

function signingSecret() {
  const configured = process.env.NID_DOB_SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;

  return crypto
    .createHash("sha256")
    .update(`pincode:nid-dob:${PASSWORD_HASH}:session-v1`)
    .digest("hex");
}

function sign(value) {
  return crypto
    .createHmac("sha256", signingSecret())
    .update(value)
    .digest("base64url");
}

function createSessionToken() {
  const payload = {
    v: 1,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
    nonce: crypto.randomBytes(12).toString("base64url")
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encoded, signature] = parts;
  if (!safeEqual(signature, sign(encoded))) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return payload?.v === 1 &&
      Number.isFinite(payload?.exp) &&
      payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const out = {};
  for (const piece of header.split(";")) {
    const index = piece.indexOf("=");
    if (index < 0) continue;
    const key = piece.slice(0, index).trim();
    const value = piece.slice(index + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(value);
    } catch {
      out[key] = value;
    }
  }
  return out;
}

function isAuthorized(req) {
  const cookies = parseCookies(req);
  return verifySessionToken(cookies[COOKIE_NAME]);
}

function sessionCookie(token) {
  return [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Strict"
  ].join("; ");
}

function clearSessionCookie() {
  return [
    `${COOKIE_NAME}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "Secure",
    "SameSite=Strict"
  ].join("; ");
}

function noStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (!host) return false;
  try {
    return new URL(origin).host === String(host);
  } catch {
    return false;
  }
}

module.exports = {
  COOKIE_NAME,
  clearSessionCookie,
  createSessionToken,
  isAuthorized,
  noStore,
  sameOrigin,
  sessionCookie,
  verifyPassword
};
