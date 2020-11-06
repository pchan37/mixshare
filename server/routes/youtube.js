const data = require('../placeholders/samplePlaylists');
const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems';

const express = require('express');
const router = express.Router();
const apiKey = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

//search youtube API
router.post('/songs', async (req, res) => {
  /* res = YouTube.Search.list('id,snippet', {
    q: req.body.query,
    maxResults: 10,
    key: apiKey,
  }); */
  console.log(req.body.query);
  var res = samplePlaylists.playlists.filter(function (playlist) {
    return playlist.name == req.body.query;
  });
  console.log(res);
  return res;
});

module.exports = router;
