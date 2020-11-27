const express = require('express');
const router = express.Router();

const accountRouter = require('./account');
const authRouter = require('./auth');
const playlistRouter = require('./playlist');
const userRouter = require('./user');
const youtubeRouter = require('./youtube');

router.use('/account', accountRouter);
router.use('/auth', authRouter);
router.use('/playlist', playlistRouter);
router.use('/youtube', youtubeRouter);
router.use('/user', userRouter);

module.exports = router;
