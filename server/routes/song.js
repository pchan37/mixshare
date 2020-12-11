const express = require('express');
const router = express.Router();

const { Song } = require('../database/models');

// POST /getSongs: retrieve list of songs from a playlist (takes an array of songIds)
router.post('/getSongs', async (req, res) => {
  try {
    const songIds = req.body.songIds;
    const songs = [];
    for (const songId of songIds) {
      const song = await Song.findOne({ songId });
      if (song === null) break;
      songs.push(song);
    }
    res.send(songs);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
