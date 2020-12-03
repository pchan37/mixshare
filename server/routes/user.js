const express = require('express');
const router = express.Router();

const { Account, User } = require('../database/models');
const response = require('../lib').Response;

// POST /searchUsers: sends back to client a list of users matching the query
router.post('/searchUsers', async (req, res) => {
  console.log('Searching for Users');
  const query = req.body.query;

  if (query !== '') {
    try {
      var regexQuery = new RegExp('.*(' + query + ').*');

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

// POST /sendFriendRequest: adds userId of sender to receiver's pendingFriendRequests field
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
      return response.UserError(res, 400, 'Request already sent!');
    }

    if (getTargetUser.friends.includes(selfId)) {
      return response.UserError(res, 400, 'Already friends with this user!');
    }

    // Check if target has sent friend request to you
    const selfUser = await User.findOne({
      userId: selfId,
    });

    if (selfUser.pendingFriendRequests.includes(requestTarget)) {
      return response.UserError(res, 400, 'Check pending friend requests');
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

// POST /getPendingRequests: returns a list of current user's pending friend requests
router.post('/getPendingRequests', async (req, res) => {
  const username = req.body.username;

  // get userId
  const gettingAccount = await Account.findOne({
    username: username,
  });

  const userId = gettingAccount.userId;

  const gettingUser = await User.findOne({
    userId: userId,
  });

  const friendRequests = gettingUser.pendingFriendRequests;
  var requestUsers = [];

  for await (const id of friendRequests) {
    const user = await Account.findOne({
      userId: id,
    });
    requestUsers.push(user);
  }

  res.send(requestUsers);
});

router.post('/friends', async (req, res) => {
  const currUser = req.body.username;

  try {
    // get userId
    const gettingAccount = await Account.findOne({
      username: currUser,
    });
    const currUserId = gettingAccount.userId;

    const gettingUser = await User.findOne({
      userId: currUserId,
    });

    const friends = gettingUser.friends;
    var friendArray = [];

    for await (const id of friends) {
      const user = await Account.findOne({
        userId: id,
      });
      friendArray.push(user);
    }

    res.send(friendArray);
  } catch (err) {
    console.error(err);
    return response.ServerError(err);
  }
});

// POST /removeRequest: removes selected pending friend request from current user's list of pending friend requests
router.post('/removeRequest', async (req, res) => {
  const currUser = req.body.currUser; // username
  const userToAccept = req.body.userToAccept;

  try {
    // get userId
    const gettingAccount = await Account.findOne({
      username: currUser,
    });
    const currUserId = gettingAccount.userId;

    console.log(currUserId, userToAccept);

    // remove request from currUser's pending friend requests
    const updatedRequests = await User.findOneAndUpdate(
      { userId: currUserId },
      { $pull: { pendingFriendRequests: userToAccept } }
    );
    return response.OK(res, 'Request Removed!');
  } catch (err) {
    console.error(err);
    return response.ServerError(err);
  }
});

// POST /addUser: adds current user and new friend to each other's friend field arrays
router.post('/addUser', async (req, res) => {
  try {
    const currUser = req.body.currUser; // username
    const userToAccept = req.body.userToAccept;

    // get userId
    const gettingAccount = await Account.findOne({
      username: currUser,
    });
    const currUserId = gettingAccount.userId;

    // add to each other's friends lists
    await User.findOneAndUpdate(
      { userId: currUserId },
      { $push: { friends: userToAccept, $position: 0 } }
    );

    await User.findOneAndUpdate(
      { userId: userToAccept },
      { $push: { friends: currUserId, $position: 0 } }
    );

    return response.OK(res, 'Friend Added Successfully');
  } catch (err) {
    console.error(err);
    return response.ServerError(err);
  }
});

// POST /removeFriend: removes selected friend from friends list
router.post('/removeFriend', async (req, res) => {
  try {
    selfUsername = req.body.currUsername;
    otherUsername = req.body.unfriend;

    // get userId
    const gettingSelf = await Account.findOne({
      username: selfUsername,
    });

    const gettingOther = await Account.findOne({
      username: otherUsername,
    });

    const selfUserId = gettingSelf.userId;
    const otherUserId = gettingOther.userId;

    await User.findOneAndUpdate(
      { userId: selfUserId },
      { $pull: { friends: otherUserId } }
    );

    await User.findOneAndUpdate(
      { userId: otherUserId },
      { $pull: { friends: selfUserId } }
    );
    return response.OK(res, 'User removed succesfully');
  } catch (err) {
    console.error(err);
    return response.ServerError(err);
  }
});

module.exports = router;
