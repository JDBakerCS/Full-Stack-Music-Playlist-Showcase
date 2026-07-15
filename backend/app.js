const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const {db} = require("./models");
const playlistsRouter = require("./routes/playlistsR")
const songsRouter = require("./routes/songsR");
const app = express();
const PORT = 6969;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/playlists", playlistsRouter);
app.use("/songs", songsRouter);

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    error: error.message || "Internal server error"
  })
})

// const init = async () => {
//   try {
//     await db.authenticate();
//     console.log("Database connected");
//     app.listen(PORT, () => {
//       console.log("Server running on http://localhost:6969");
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
// init();
db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on http://localhost:6969");
    });
  })
  .catch((error) => {
    console.error(error);
  });
