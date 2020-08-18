const express = require('express');
const router = express.Router();
const { getPages, createPage, savePage, deletePage } = require('../controllers/pages');
const auth = require('../middleware/auth');

router.get('/', auth, getPages)

router.route('/create').post(createPage);
router.route('/save').post(savePage);
router.route('/:id').delete(deletePage);

module.exports = router;