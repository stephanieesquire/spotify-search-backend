const express = require("express");
const authenticationRouter = express.Router();
const { apiToken } = require("../controllers/authenticationController");

authenticationRouter.post("/token", apiToken);

module.exports = authenticationRouter;
