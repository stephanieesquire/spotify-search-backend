require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT;
const app = express();

routes(app);

app.listen(APP_PORT, () =>
  console.log(`[Express] Server running on port ${APP_PORT}`)
);
