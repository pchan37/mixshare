const sampleSongs = require('../placeholders/SampleSongs');
const samplePlaylists = require('../placeholders/samplePlaylists');
const express = require('express');
const router = express.Router();
const apiKey = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

//search youtube API
router.post('/songs', async (req, res) => {
  var matchedSongs = [];
  sampleSongs.songs.filter(function (song) {
    if (song.name.toLowerCase().includes(req.body.query.toLowerCase())) {
      matchedSongs.push(song);
    }
  });
  res.send(matchedSongs);
});

router.post('/playlists', async (req, res) => {
  var matchedPlaylists = [];
  samplePlaylists.playlists.filter(function (playlist) {
    if (playlist.name.toLowerCase().includes(req.body.query.toLowerCase()))
      matchedPlaylists.push(playlist);
  });
  res.send(matchedPlaylists);
});

const Youtube = require('youtube-api');
const API_KEY = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

Youtube.authenticate({
  type: 'key',
  key: API_KEY,
});

// search youtube API given query
router.post('/songs', async (req, res) => {
  q = req.body.query;
  console.log('Youtube:', q);

  var results = Youtube.search.list({
    part: 'snippet',
    maxResults: 10,
    q: q,
    type: 'video',
    videoCategoryId: 10,
  });
  results.then((r) => res.send(r.data.items));
});

// searches playlists from sample Playlists
router.post('/playlists', async (req, res) => {
  var matchedPlaylists = [];
  samplePlaylists.playlists.filter(function (playlist) {
    if (playlist.name.toLowerCase().includes(req.body.query.toLowerCase()))
      matchedPlaylists.push(playlist);
  });
  res.send(matchedPlaylists);
});

module.exports = router;
