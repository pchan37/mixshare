const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const youtubeRouter = require('./youtube');
const playlistRouter = require('./playlist');

router.use('/auth', authRouter);
router.use('/youtube', youtubeRouter);
router.use('/playlist', playlistRouter);

module.exports = router;
