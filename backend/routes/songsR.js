const express = require("express");
const router = express.Router();
const { Song, Playlist } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: {
        model: Playlist,
        through: { attributes: [] },
      },
    });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (error) {
    next(error);
  }
});




module.exports = router;