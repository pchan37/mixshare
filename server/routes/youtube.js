const express = require('express');

const He = require('he');
const Youtube = require('youtube-api');

const { Playlist } = require('../database/models');
const response = require('../lib').Response;

const router = express.Router();

const API_KEY = 'AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8';

Youtube.authenticate({
  type: 'key',
  key: API_KEY,
});

//search youtube API
router.post('/songs', async (req, res) => {
  q = req.body.query;

  try {
    const results = await Youtube.search.list({
      part: 'snippet',
      maxResults: 10,
      q: q,
      type: 'video',
      videoCategoryId: 10,
    });

    for (song of results.data.items) {
      song.snippet.title = He.decode(song.snippet.title);
    }

    res.send(results.data.items);
  } catch (err) {
    return response.ServerError(res);
  }
});

router.get('/playlists', async (req, res) => {
  const searchQuery = req.query.query;
  try {
    if (searchQuery !== '') {
      var regexQuery = new RegExp('.*(' + searchQuery + ').*');
      const searchResults = await Playlist.find({
        playlistName: regexQuery,
      });
      res.send(searchResults);
    } else {
      res.send([]);
    }
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

router.get('/topSongs', async (req, res) => {
  try {
    const results = await Youtube.videos.list({
      part: ['snippet,contentDetails,statistics'],
      chart: 'mostPopular',
      regionCode: 'US',
      videoCategoryId: 10,
    });
    for (song of results.data.items) {
      song.snippet.title = He.decode(song.snippet.title);
    }
    res.send(results.data.items);
  } catch (err) {
    return response.ServerError(res);
  }
});

module.exports = router;
