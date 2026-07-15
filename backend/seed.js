const { db, Playlist, Song } = require("./models");

const seed = async () => {
  try {
    await db.sync({ force: true });

    const song1 = await Song.create({
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: 200,
    });

    const song2 = await Song.create({
      title: "Levitating",
      artist: "Dua Lipa",
      duration: 203,
    });

    const song3 = await Song.create({
      title: "Sunflower",
      artist: "Post Malone",
      duration: 158,
    });

    const roadTrip = await Playlist.create({
      name: "Road Trip",
      description: "Songs for long drives",
    });

    const studyMix = await Playlist.create({
      name: "Study Mix",
      description: "",
    });

    await roadTrip.addSongs([song1, song2]);
    await studyMix.addSong(song3);

    console.log("seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
};

seed();