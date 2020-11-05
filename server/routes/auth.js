const express = require('express');
const router = express.Router();

// retrieve the currently logged in user
router.get('/user', (req, res) => {
});

// attempt to log the client in
router.post('/login', async (req, res, next) => {
});

// attempt to register the client
router.post('/register', async (req, res, next) => {
});

// delete the client's session
router.post('/logout', async (req, res, next) => {
});

module.exports = router;
