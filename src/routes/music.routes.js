const express = require("express");
const multer = require("multer");

const { authArtist, authUser } = require("../middleware/auth.middleware");
const musicController = require("../controllers/music.controller");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage
});

router.post(
    "/create-music",
    authArtist,
    upload.single("music"),
    musicController.createMusic
);

router.post(
    "/create-album",
    authArtist,
    musicController.createAlbum
);

router.get("/", authUser, musicController.getAllMusics);

router.get("/albums", authUser, musicController.getAllAlbums);

router.get("/albums/:albumID", authUser, musicController.getAlbumByID);

router.delete("/:id", authArtist, musicController.deleteMusic);

router.delete("/album/:id", authArtist, musicController.deleteAlbum);

router.patch("/:id", authArtist, musicController.updateMusic);

module.exports = router;