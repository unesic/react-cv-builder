const Page = require('../models/Page');
const User = require('../models/User');

/**
 * @desc	Get all pages
 * @route	GET /api/v1/pages
 * @access	Public
 */
exports.getPages = async (req, res, next) => {
	try {
		const pages = await Page.find({ ownerId: req.user.id });

		return res.status(200).json({
			success: true,
			data: pages
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server error',
		})
	}
}

/**
 * @desc	Create new page
 * @route	POST /api/v1/pages/create
 * @access	Private
 */
exports.createPage = async (req, res, next) => {
	try {
		const { ownerId, title, slug, data } = req.body;
		const page = await Page.create(req.body);

		return res.status(201).json({
			success: true,
			data: page
		})
	} catch (err) {
		if (err.name = 'ValidationError') {
			const messages = Object.values(err.errors).map(val => val.message);

			return res.status(400).json({
				success: false,
				error: messages
			})
		}
		
		return res.status(500).json({
			success: false,
			error: 'Server error',
		})
	}
}

/**
 * @desc	Update/save page
 * @route	POST /api/v1/pages/save
 * @access	Private
 */
exports.savePage = async (req, res, next) => {
	try {
		const { id, ownerId, data } = req.body;
		const page = await Page.findById(id);

		if (!ownerId || !page.ownerId === ownerId) {
			return res.status(403).json({
				success: false,
				error: 'Permission denied'
			})
		}

		page.data = data;

		return res.status(201).json({
			success: true,
			data: page
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server error',
		})
	}
}

/**
 * @desc	Delete page
 * @route	DELETE /api/v1/pages/:id
 * @access	Public
 */
exports.deletePage = async (req, res, next) => {
    try {
		const page = await Page.findById(req.params.id)

		if (!page) {
			return res.status(404).json({
				success: false,
				error: 'No page found'
			});
		}

		await page.remove();

		return res.status(200).json({
			success: true,
			data: {}
		});

	} catch (err) {
		return res.status(500).json({
			success: false,
			err: 'Server error',
		})
	}
}