const musicModel = require("../models/music.model");
const uploadFile = require("../services/music.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (err) {
        console.error("Create Music Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Album title is required"
            });
        }

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                musics: album.musics,
                artist: album.artist
            }
        });

    } catch (err) {
        console.error("Create Album Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getAllMusics(req, res) {
    try {
        const musics = await musicModel.find().populate("artist", "username email");

        return res.status(200).json({
            message: "All musics fetched successfully",
            musics
        });

    } catch (err) {
        console.error("Get All Musics Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel
            .find()
            .populate("artist", "username email")
            .populate("musics");

        return res.status(200).json({
            message: "All albums fetched successfully",
            albums
        });

    } catch (err) {
        console.error("Get All Albums Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getAlbumByID(req, res) {
    try {
        const { albumID } = req.params;

        const album = await albumModel.findById(albumID)
            .populate("artist", "username email")
            .populate("musics");

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        return res.status(200).json({
            message: "Album fetched successfully",
            album
        });

    } catch (err) {
        console.error("Get Album By ID Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function deleteMusic(req, res) {
    try {
        const { id: musicId } = req.params;

        const music = await musicModel.findById(musicId);

        if (!music) {
            return res.status(404).json({
                message: "Music not found"
            });
        }

        if (music.artist.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own music"
            });
        }

        await musicModel.findByIdAndDelete(musicId);

        return res.status(200).json({
            message: "Music deleted successfully"
        });

    } catch (err) {
        console.error("Delete Music Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function deleteAlbum(req, res) {
    try {
        const { id: albumId } = req.params;

        const album = await albumModel.findById(albumId);

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        if (album.artist.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own album"
            });
        }

        await albumModel.findByIdAndDelete(albumId);

        return res.status(200).json({
            message: "Album deleted successfully"
        });

    } catch (err) {
        console.error("Delete Album Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function updateMusic(req, res) {
    try {
        const { id: musicId } = req.params;
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const music = await musicModel.findById(musicId);

        if (!music) {
            return res.status(404).json({
                message: "Music not found"
            });
        }

        if (music.artist.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own music"
            });
        }

        music.title = title;

        await music.save();

        return res.status(200).json({
            message: "Music updated successfully",
            music: {
                id: music._id,
                title: music.title,
                uri: music.uri,
                artist: music.artist
            }
        });

    } catch (err) {
        console.error("Update Music Error:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

module.exports = {
    createMusic,
    createAlbum,
    getAllMusics,
    getAllAlbums,
    getAlbumByID,
    deleteMusic,
    deleteAlbum,
    updateMusic
};