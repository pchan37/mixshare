const express = require('express');
const router = express.Router();

const { Account, User } = require('../database/models');
const response = require('../lib').Response;

router.post('/searchUsers', async (req, res) => {
  console.log('Searching for Users');
  const query = req.body.query;

  if (query !== '') {
    try {
      var regexQuery = new RegExp('.*(' + query + ').*');
      console.log(regexQuery);

      const findingUsers = await Account.find({
        username: { $regex: regexQuery, $ne: req.body.username },
      });
      res.send(findingUsers);
    } catch (err) {
      console.log('Encountered error when searching');
      return response.ServerError(err);
    }
  } else {
    res.send([]);
  }
});

router.post('/sendFriendRequest', async (req, res) => {
  const requestTarget = req.body.userId;
  const selfUsername = req.body.selfUsername;

  try {
    const selfAccount = await Account.findOne({
      username: selfUsername,
    });

    const selfId = selfAccount.userId;

    // Check if request has been sent already
    const getTargetUser = await User.findOne({
      userId: requestTarget,
    });

    if (getTargetUser.pendingFriendRequests.includes(selfId)) {
      return response.UserError(res, 400, 'Request already sent');
    }

    console.log(`Sending request to ${requestTarget}`);

    await User.findOneAndUpdate(
      { userId: requestTarget },
      { $push: { pendingFriendRequests: selfId } }
    );
    return response.OK(res, 'Request sent!');
  } catch (err) {
    console.log('Encountered error when sending friend request');
    return response.ServerError(res);
  }
});

module.exports = router;
