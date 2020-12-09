const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const { Account, Playlist, User } = require('../database/models');
const response = require('../lib').Response;

router.post('/changeUsername', async (req, res) => {
  const currentUsername = req.body.username;
  const newUsername = req.body.newname;

  if (newUsername === '') {
    return response.UserError(res, 400, 'Username cannot be blank');
  }

  if (currentUsername === newUsername) {
    console.log('Already your current username');
    return response.UserError(res, 400, 'Already your current username');
  }

  try {
    const checkName = await Account.findOne({ username: newUsername });

    if (checkName !== null && checkName !== undefined) {
      console.log('Username already taken!');
      return response.UserError(res, 400, 'Username already taken!');
    }

    await Account.updateOne(
      { username: currentUsername },
      { $set: { username: newUsername } }
    );

    res.send(newUsername);
  } catch (err) {
    console.log(`Encountered error when changing name: ${err.message}`);
    return response.ServerError(res);
  }
});

router.post('/changePassword', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  try {
    if (password === '') {
      return response.UserError(res, 400, 'Password cannot be blank');
    }

    if (password !== confirmPassword) {
      return response.UserError(res, 400, 'The passwords do not match.');
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(`There was an issue hashing the password: ${err.message}`);
        return response.ServerError(res);
      }

      await Account.update(
        { username: username },
        { $set: { password: hash } }
      );
      return response.OK(res, 'Password Changed successfully!');
    });
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

router.post('/deleteAccount', async (req, res) => {
  const username = req.body.username; // to be replaced with uuid

  // get userId
  const selfAccount = await Account.findOne({ username });

  const selfId = selfAccount.userId;

  try {
    await Account.deleteOne({ username });
    await User.deleteOne({ userId: selfId });
    await Playlist.updateMany(
      { ownerUsername: username },
      { $set: { ownerUsername: 'Deleted User' } }
    );
    return response.OK(res, 'Account Deleted');
  } catch (err) {
    console.error(err);
    return response.ServerError(res);
  }
});

module.exports = router;
