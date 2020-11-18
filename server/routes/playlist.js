const express = require('express');
const router = express.Router();

const { v4: uuid } = require('uuid');

const { Playlist } = require('../database/models');

router.get('/playlists', (req, res) => {
  if (req.user !== undefined) {
    console.log(Playlist.find());
  }
});

router.post('/playlist', async (req, res) => {
  const playlistID = uuid();
  if (req.body.playlistName !== '') {
    try {
      await Playlist.create({
        playlistId: playlistID,
        ownerUserId: 'jasmine',
        playlistName: req.body.playlistName,
        mixtapeMode: false,
        private: false,
        views: 0,
        songs: [],
      });
      res.send('sent');
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('Playlist name cannot be empty');
  }
});

module.exports = router;
