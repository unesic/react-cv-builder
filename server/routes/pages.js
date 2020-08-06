const express = require('express');
const router = express.Router();
const { getPages, addPage, deletePage } = require('../controllers/pages');

router
	.route('/')
	.get(getPages)
	.post(addPage);

router
	.route('/:id')
	.delete(deletePage);

module.exports = router;