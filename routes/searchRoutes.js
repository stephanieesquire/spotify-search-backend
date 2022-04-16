const express = require("express");
const searchRouter = express.Router();
const { artistAlbums } = require("../controllers/searchController");

searchRouter.get("/artist/albums/:artist", artistAlbums);

module.exports = searchRouter;
