const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, deleteUser } = require('../controllers/users');
const auth = require('../middleware/auth');

router.get('/', auth, getAllUsers);
router.post('/', addUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;