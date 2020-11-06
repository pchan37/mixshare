const sampleSongs = require('../placeholders/SampleSongs');
const samplePlaylists = require('../placeholders/samplePlaylists');
const express = require('express');
const router = express.Router();
const apiKey = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

//search youtube API
router.post('/songs', async (req, res) => {
  var matchedSongs = [];
  console.log(sampleSongs.songs);
  sampleSongs.songs.filter(function (song) {
    if (song.name.toLowerCase().includes(req.body.query.toLowerCase())) {
      matchedSongs.push(song);
    }
  });
  res.send(matchedSongs);
  // return ['Hello'];
});

router.post('/playlists', async (req, res) => {
  var matchedPlaylists = [];
  samplePlaylists.playlists.filter(function (playlist) {
    if (playlist.name.toLowerCase().includes(req.body.query.toLowerCase()))
      matchedPlaylists.push(playlist);
  });
  console.log('reponse', matchedPlaylists);
  res.send(matchedPlaylists);
});

module.exports = router;
