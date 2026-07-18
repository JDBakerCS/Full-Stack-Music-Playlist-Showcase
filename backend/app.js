require("dotenv").config();
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const {db} = require("./models");
const playlistsRouter = require("./routes/playlistsR")
const songsRouter = require("./routes/songsR");
const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(morgan("dev"));
app.use("/playlists", playlistsRouter);
app.use("/songs", songsRouter);

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    error: error.message || "Internal server error"
  })
})


db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running");
    });
  })
  .catch((error) => {
    console.error(error);
  });
