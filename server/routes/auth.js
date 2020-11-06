const express = require('express');
const router = express.Router();
const passport = require('passport');

const { User } = require('../database/models');

// retrieve the currently logged in user
router.get('/user', (req, res) => {
  if (req.user !== undefined) {
    return res.json({ username: req.user.username });
  }

  console.log('No existing session found.');
  return res.json({});
});

// attempt to log the client in
router.post('/login', async (req, res, next) => {});

// attempt to register the client
router.post('/register', async (req, res, next) => {});

// delete the client's session
router.post('/logout', async (req, res, next) => {});

module.exports = router;
