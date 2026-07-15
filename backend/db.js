const { Sequelize } = require("sequelize");


const db = new Sequelize("postgres://postgres:root@localhost:5432/Music_Playlist", {
  logging: false,
  dialect: "postgres"
});

module.exports = db;