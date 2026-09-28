const { isAuthorized, noStore } = require("../lib/nid-dob-auth");
const {
  DEFAULT_BIRTH_PATH,
  DEFAULT_NID_PATH,
  porichoyConfigured
} = require("../lib/porichoy-live");

module.exports = async function handler(req, res) {
  noStore(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ ok: false, error: "Authentication required." });
  }

  return res.status(200).json({
    ok: true,
    productionOnly: true,
    porichoyConfigured: porichoyConfigured(),
    provider: "Porichoy",
    baseUrl: "https://api.porichoybd.com",
    endpoints: {
      nid: process.env.PORICHOY_NID_PATH || DEFAULT_NID_PATH,
      birth: process.env.PORICHOY_BIRTH_PATH || DEFAULT_BIRTH_PATH
    }
  });
};
