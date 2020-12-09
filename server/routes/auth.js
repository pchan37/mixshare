const express = require('express');
const passport = require('passport');

const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const { Account, User } = require('../database/models');
const response = require('../lib').Response;

const router = express.Router();

// GET /user: retrieve the currently logged in user
router.get('/user', (req, res) => {
  if (req.user !== undefined) {
    return res.json({ username: req.user.username });
  }

  console.log('No existing session found.');
  return res.json({});
});

// POST /login: attempt to log the client in
router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, _) => {
      if (err) {
        next(err);
      }
      console.log('User in POST /login', user);
      if (!user) {
        console.log('User could not be found.');
        return response.UserError(res, 401, 'Invalid username or password.');
      }

      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return response.OK(res, 'Successfully logged in!', {
          username: user.username,
        });
      });
    })(req, res, next);
  } catch (err) {
    console.log(`B: Encountered "${err.message}" while logging user in.`);
    return ServerErrorResponse(res);
  }
});

// POST /register: Attempt to register the client
router.post('/register', async (req, res) => {
  const { username, password, confirmationPassword } = req.body;
  try {
    const user = await Account.findOne({ username });
    if (user !== null && user !== undefined) {
      console.log(`${username} already exists!`);
      return response.UserError(res, 400, `${username} already exists!`);
    } else {
      // TODO: Replace comparison with a linear time comparison
      if (password !== confirmationPassword) {
        return response.UserError(res, 400, 'The passwords do not match.');
      }

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.log(
            `There was an issue hashing the password: ${err.message}`
          );
          return response.ServerError(res);
        }

        const generatedId = `U-${uuid()}`;

        await Account.create({
          username,
          password: hash,
          userId: generatedId,
        });

        await User.create({
          userId: generatedId,
          friends: [],
          pendingFriendRequests: [],
          receivedGiftPlaylists: [],
          receivedSongRecommendations: [],
        });
      });
      return response.OK(res, 'Account created successfully!');
    }
  } catch (err) {
    console.log(`Encountered error when registering: ${err.message}`);
    return response.ServerError(res);
  }
});

// POST /logout: delete the client's session
router.post('/logout', async (req, res) => {
  req.logout();
  req.session.destroy((_) => {
    res.clearCookie('sid');
    return res.redirect('/');
  });
});

module.exports = router;
