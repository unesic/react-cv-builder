const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { authUser, getUserData } = require('../controllers/auth');

router.post('/', authUser);
router.get('/user', auth, getUserData);

module.exports = router;