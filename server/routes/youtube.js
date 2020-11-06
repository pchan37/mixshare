const sampleSongs = require('../placeholders/SampleSongs');
const samplePlaylists = require('../placeholders/samplePlaylists');
const express = require('express');
const router = express.Router();
const apiKey = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

//search youtube API
router.post('/songs', async (req, res) => {
  var response = sampleSongs.songs.filter(function (song) {
    var matchedSongs = [];
    if (song.name.toLowerCase().includes(req.body.query.toLowerCase()))
      matchedSongs.push(song);
    return matchedSongs;
  });
  console.log('reponse', response);
  res.send(response);
  // return ['Hello'];
});

router.post('/playlists', async (req, res) => {
  console.log(req.body.query);
  var res = samplePlaylists.playlists.filter(function (playlist) {
    return playlist.name == req.body.query;
  });
  console.log(res);
  return res;
});

module.exports = router;
