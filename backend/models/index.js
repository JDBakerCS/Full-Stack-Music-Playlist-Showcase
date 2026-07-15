const db = require("../db");
const Playlist = require("./playlists");
const Song = require("./songs");

Playlist.belongsToMany(Song, { through: "PlaylistSongs" });
Song.belongsToMany(Playlist, { through: "PlaylistSongs" });

module.exports = {
  db,
  Playlist,
  Song,
};