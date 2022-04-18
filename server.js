require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const db = require("./db");
const APP_PORT = process.env.APP_PORT;
const app = express();

//middlewares
app.use(cors());

routes(app);
db();

app.listen(APP_PORT, "0.0.0.0", () =>
  console.log(`[Express] Server running on port ${APP_PORT}`)
);
