const express = require('express');
const router = express.Router();

const accountRouter = require('./account');
const authRouter = require('./auth');
const giftsRouter = require('./gifts');
const playlistRouter = require('./playlist');
const songRouter = require('./song');
const userRouter = require('./user');
const youtubeRouter = require('./youtube');

router.use('/account', accountRouter);
router.use('/auth', authRouter);
router.use('/gifts', giftsRouter);
router.use('/playlist', playlistRouter);

router.use('/song', songRouter);
router.use('/user', userRouter);
router.use('/youtube', youtubeRouter);

module.exports = router;
