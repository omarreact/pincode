const {
  clearSessionCookie,
  createSessionToken,
  isAuthorized,
  noStore,
  sameOrigin,
  sessionCookie,
  verifyPassword
} = require("../lib/nid-dob-auth");

const attempts = new Map();

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function blocked(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 0, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  return entry.count >= 6;
}

function noteFailure(ip) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return;
  }
  current.count += 1;
  attempts.set(ip, current);
}

function clearFailures(ip) {
  attempts.delete(ip);
}

function bodyObject(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return {};
}

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, authenticated: isAuthorized(req) });
  }

  if (!sameOrigin(req)) {
    return res.status(403).json({ ok: false, error: "Cross-origin request rejected." });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", clearSessionCookie());
    return res.status(200).json({ ok: true, authenticated: false });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const ip = clientIp(req);
  if (blocked(ip)) {
    return res.status(429).json({
      ok: false,
      error: "Too many password attempts. Try again later."
    });
  }

  const body = bodyObject(req);
  if (!verifyPassword(body.password)) {
    noteFailure(ip);
    return res.status(401).json({ ok: false, error: "Incorrect password." });
  }

  clearFailures(ip);
  res.setHeader("Set-Cookie", sessionCookie(createSessionToken()));
  return res.status(200).json({ ok: true, authenticated: true });
};
