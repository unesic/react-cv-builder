const express = require('express');
const router = express.Router();
const { getPages, createPage, getPageData, savePage, deletePage } = require('../controllers/pages');
const auth = require('../middleware/auth');

router.get('/', auth, getPages)

router.route('/create').post(createPage);
router.route('/save').patch(savePage);
router.route('/page/:token/:username/:slug').get(getPageData);
router.route('/:id').delete(deletePage);

module.exports = router;