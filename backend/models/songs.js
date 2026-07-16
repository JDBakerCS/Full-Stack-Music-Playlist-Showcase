const { DataTypes } = require("sequelize");
const db = require("../db");

const Song = db.define("Song", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  songUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  },
});

module.exports = Song;