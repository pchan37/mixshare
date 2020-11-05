const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const youtubeRouter = require('./youtube');

router.use('/auth', authRouter);
router.use('/youtube', youtubeRouter);

module.exports = router;
