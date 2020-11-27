const express = require('express');
const router = express.Router();

const { Account } = require('../database/models');

router.post('/searchUsers', async (req, res) => {
  console.log('Searching for Users');
  const query = req.body.query;

  var regexQuery = new RegExp('.*(' + query + ').*');

  const findingUsers = await Account.find({
    username: { $regex: regexQuery },
  });
  res.send(findingUsers);
});

module.exports = router;
