const samplesongs = require('../placeholders/SampleSongs');
const express = require('express');
const router = express.Router();
const apiKey = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

//search youtube API
router.post('/songs', async (req, res) => {
  // res = YouTube.Search.list('id,snippet', {
  //   q: req.body.query,
  //   maxResults: 10,
  //   key: apiKey,
  // });
  var res = samplesongs.songs.filter(function (song) {
    var matchedSongs = [];
    if (song.name.toLowerCase().includes(req.body.query.toLowerCase()))
      matchedSongs.push(song.name);
    console.log(matchedSongs);
    return matchedSongs;
  });
  // return ['Hello'];
});

module.exports = router;
