const express = require("express")
const router = express.Router();
const { Playlist, Song } = require("../models");




router.get("/", async (req, res, next) => {
    try {
        const playlists = await Playlist.findAll();

        res.json(playlists);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const playlist = await Playlist.findByPk(req.params.id, {
            include: {
                model: Song,
                through: { attributes: [] },
            },
        });
        if (!playlist) return res.status(404).json({ error: "Playlist not found" })
        res.json(playlist)
    } catch (error) {
        next(error);
    }
})
router.post("/:playlistId/songs", async (req, res, next) => {
    try {
        const playlist = await Playlist.findByPk(req.params.playlistId, {
            include: {
                model: Song,
                through: { attributes: [] },
            },
        });
        if (!playlist) return res.status(404).json({ error: "Playlist not found" });

        const song = await Song.findByPk(req.body.songId);
        if (!song) return res.status(404).json({ error: "Song not found" });

        const alreadyInPlaylist = playlist.Songs.some(
            (playlistSong) => playlistSong.id === song.id
        );

        if (alreadyInPlaylist) {
            return res.status(400).json({ error: "Song already in playlist" });
        }

        await playlist.addSong(song);
        res.status(201).json({ message: "Song added to playlist" });
    } catch (error) {
        next(error);
    }
});

router.delete("/:playlistId/songs/:songId", async (req, res, next) => {
    try {
        const playlist = await Playlist.findByPk(req.params.playlistId);
        if (!playlist) return res.status(404).json({ error: "Playlist not found" });

        const song = await Song.findByPk(req.params.songId);
        if (!song) return res.status(404).json({ error: "Song not found" });

        await playlist.removeSong(song);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;