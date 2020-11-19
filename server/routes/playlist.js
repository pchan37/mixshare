const express = require('express');
const router = express.Router();

const { v4: uuid } = require('uuid');

const { Playlist } = require('../database/models');

// POST /newPlaylist: Create a new playlist
router.post('/newPlaylist', async (req, res) => {
  const playlistID = uuid();
  if (req.body.playlistName !== '') {
    try {
      const new_playlist = await Playlist.create({
        playlistId: playlistID,
        ownerUsername: req.body.username,
        playlistName: req.body.playlistName,
        mixtapeMode: false,
        private: false,
        views: 0,
        songs: [],
      });
      console.log(new_playlist);
      res.send(new_playlist);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('Playlist name cannot be empty');
  }
});

// POST /getPlaylist: retrieve list of playlists
router.post('/getPlaylist', async (req, res) => {
  const username = req.body.username;
  try {
    const playlists = await Playlist.find({ ownerUsername: username });
    res.send(playlists);
  } catch (err) {
    console.error(err);
  }
});

// POST /deletePlaylist: delete a playlist
router.post('/deletePlaylist', async (req, res) => {
  const playlistId = req.body.playlistId;
  const username = req.body.username;
  console.log(playlistId, username);
  try {
    await Playlist.findOneAndDelete({ playlistId: playlistId });
    const updatedPlaylist = await Playlist.find({ ownerUsername: username });
    res.send(updatedPlaylist);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
