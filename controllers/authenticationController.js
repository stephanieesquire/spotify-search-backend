const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function apiToken(req, res) {
  try {
    const result = await fetch(`${process.env.SPOTIFY_API_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    res.json({ access_token: data.access_token });
  } catch (error) {
    res.json(error);
  }
}

module.exports = { apiToken };
