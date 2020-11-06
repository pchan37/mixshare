const express = require('express');
const router = express.Router();
const apiKey = AIzaSyCqRkLe3nqTjE7yHIeqMn6jprdkEQPTec8;

//search youtube API
router.post('/songs', async (req, res) => {
  console.log('Hey');
  /* res = YouTube.Search.list('id,snippet', {
    q: req,
    maxResults: 10,
    key: apiKey,
  });*/
  return ['Hello'];
});

module.exports = router;
