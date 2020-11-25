const express = require('express');
const router = express.Router();

const { Song } = require('../database/models');

// POST /getSongs: retrieve list of songs from a playlist (takes an array of songIds)
router.post('/getSongs', async (req, res) => {
  try {
    const songIds = req.body.songIds;
    console.log(songIds);
    const songs = [];
    for (var i = 0; i < songIds.length; i++) {
      const song = await Song.findOne({ songId: songIds[i] });
      songs.push(song);
    }
    console.log(songs);
    res.send(songs);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
