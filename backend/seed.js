const { db, Playlist, Song } = require("./models");

const seed = async () => {
  try {
    await db.sync({ force: true });

    const song1 = await Song.create({
      title: "Grandpa's Land",
      artist: "James Dalton Baker",
      songUrl: "https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[song_ids]=17323954&context_type=song&pwc[size]=small",
    });

    const song2 = await Song.create({
      title: "I'm Leaving",
      artist: "James Dalton Baker",
      songUrl: "https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[song_ids]=6854493&context_type=song&pwc[size]=small",
    });

    const song3 = await Song.create({
      title: "Palm Tree Desert (New Mix)",
      artist: "James Dalton Baker",
      songUrl: "https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[song_ids]=6519180&context_type=song&pwc[size]=small",
    });

    const song4 = await Song.create({
      title: "The Walker Instrumental",
      artist: "James Dalton Baker",
      songUrl: "https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[song_ids]=6583524&context_type=song&pwc[size]=small",
    });

    const song5 = await Song.create({
      title: "Lovin' (New Mix)",
      artist: "James Dalton Baker",
      songUrl: "https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[song_ids]=6686271&context_type=song&pwc[size]=small",
    });

    const roadTrip = await Playlist.create({
      name: "Road Trip",
      description: "Songs for long drives",
    });

    const studyMix = await Playlist.create({
      name: "Study Mix",
      description: "",
    });

    await roadTrip.addSongs([song1, song2, song3]);
    await studyMix.addSong([song4, song5]);

    console.log("seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await db.close();
  }
};

seed();