const express = require("express");
const searchRouter = express.Router();
const { artistAlbums } = require("../controllers/searchController");

searchRouter.get("/artist/albums", artistAlbums);

module.exports = searchRouter;
