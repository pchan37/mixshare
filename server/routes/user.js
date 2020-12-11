const express = require('express');
const router = express.Router();

const { Account, User } = require('../database/models');
const response = require('../lib').Response;

// POST /getUserId: get userId using username
router.post('/getUserId', async (req, res) => {
  const username = req.body.username;
  try {
    const userAccount = await Account.findOne({
      username,
    });
    res.send(userAccount.userId);
  } catch (err) {
    console.error(err);
    response.UserError(res, 400, 'Username is not associated with a userId');
  }
});

// POST /searchUsers: sends back to client a list of users matching the query
router.post('/searchUsers', async (req, res) => {
  const query = req.body.query;

  if (query !== '') {
    try {
      var regexQuery = new RegExp('.*(' + query + ').*');

      const searchResults = await Account.find({
        username: { $regex: regexQuery, $ne: req.body.username },
      });
      res.send(searchResults);
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
  const targetId = req.body.targetId;
  const selfUsername = req.body.selfUsername;

  try {
    const selfAccount = await Account.findOne({
      username: selfUsername,
    });

    const selfId = selfAccount.userId;

    // Check if request has been sent already
    const targetUser = await User.findOne({
      userId: targetId,
    });

    if (targetUser.pendingFriendRequests.includes(selfId)) {
      return response.UserError(res, 400, 'Request already sent!');
    }

    if (targetUser.friends.includes(selfId)) {
      return response.UserError(res, 400, 'Already friends with this user!');
    }

    // Check if target has sent friend request to you
    const selfUser = await User.findOne({
      userId: selfId,
    });

    if (selfUser.pendingFriendRequests.includes(targetId)) {
      return response.UserError(res, 400, 'Check pending friend requests');
    }

    console.log(`Sending request to ${targetId}`);

    await User.findOneAndUpdate(
      { userId: targetId },
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
  try {
    const username = req.body.username;

    // get userId
    const selfAccount = await Account.findOne({
      username: username,
    });

    const userId = selfAccount.userId;

    const selfUser = await User.findOne({
      userId: userId,
    });

    const friendRequests = selfUser.pendingFriendRequests;
    var requestUsers = [];

    for await (const id of friendRequests) {
      const user = await Account.findOne({
        userId: id,
      });
      if (user !== null) {
        requestUsers.push(user);
      } else {
        // user has been deleted, remove their pending friend request
        await User.findOneAndUpdate(
          { userId },
          { $pull: { pendingFriendRequests: id } }
        );
      } else {
        requestUsers.push(user);
      }
    }

    res.send(requestUsers);
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /friends: gets list of friends (Account objects) of logged-in user
router.post('/friends', async (req, res) => {
  const selfUsername = req.body.username;

  try {
    // get userId
    const selfAccount = await Account.findOne({
      username: selfUsername,
    });
    const selfId = selfAccount.userId;

    const selfUser = await User.findOne({
      userId: selfId,
    });

    const friends = selfUser.friends;
    var friendArray = [];

    for await (const id of friends) {
      const user = await Account.findOne({
        userId: id,
      });
      if (user !== null) friendArray.push(user);
    }

    res.send(friendArray);
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /friendsUserIds: gets list of friends (userIds) of user
router.post('/friendsUserIds', async (req, res) => {
  const username = req.body.username;

  try {
    const selfAccount = await Account.findOne({ username });
    const selfUser = await User.findOne({ userId: selfAccount.userId });
    res.send(selfUser.friends);
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /removeRequest: removes selected pending friend request from current user's list of pending friend requests
router.post('/removeRequest', async (req, res) => {
  console.log('removing request');
  const selfUsername = req.body.selfUsername; // username
  const targetId = req.body.targetId;

  try {
    // get userId
    const selfAccount = await Account.findOne({
      username: selfUsername,
    });
    const selfId = selfAccount.userId;

    // remove request from currUser's pending friend requests
    await User.findOneAndUpdate(
      { userId: selfId },
      { $pull: { pendingFriendRequests: targetId } }
    );
    return response.OK(res, 'Request Removed!');
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /addUser: adds current user and new friend to each other's friend field arrays
router.post('/addUser', async (req, res) => {
  console.log('adding user');
  try {
    const selfUsername = req.body.selfUsername;
    const targetId = req.body.targetId;

    // get userId
    const selfAccount = await Account.findOne({
      username: selfUsername,
    });
    const selfId = selfAccount.userId;

    // catch duplicate bug that happens with double-clicking the accept button
    const selfUser = await User.findOne({ userId: selfId });
    if (selfUser.friends.includes(targetId))
      return response.UserError(res, 'Already friends with this user');

    // add to each other's friends lists
    await User.findOneAndUpdate(
      { userId: selfId },
      { $push: { friends: targetId, $position: 0 } }
    );

    await User.findOneAndUpdate(
      { userId: targetId },
      { $push: { friends: selfId, $position: 0 } }
    );

    return response.OK(res, 'Friend Added Successfully');
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

// POST /removeFriend: removes selected friend from friends list
router.post('/removeFriend', async (req, res) => {
  console.log('removing friend');
  try {
    selfUsername = req.body.currUsername;
    targetId = req.body.unfriend;

    // get userId
    const selfAccount = await Account.findOne({
      username: selfUsername,
    });

    const selfId = selfAccount.userId;

    await User.findOneAndUpdate(
      { userId: selfId },
      { $pull: { friends: targetId } }
    );

    await User.findOneAndUpdate(
      { userId: targetId },
      { $pull: { friends: selfId } }
    );
    return response.OK(res, 'User removed succesfully');
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

module.exports = router;
