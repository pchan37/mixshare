const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const youtubeRouter = require('./youtube');
const accountRouter = require('./account');

router.use('/auth', authRouter);
router.use('/youtube', youtubeRouter);
router.use('/account', accountRouter);

module.exports = router;
