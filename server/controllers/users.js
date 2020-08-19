const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * @desc	Get all users
 * @route	GET /api/v1/users
 * @access	Private
 */
exports.getAllUsers = async (req, res, next) => {
	try {
		const user = await User.find();

		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server error',
		})
	}
}

/**
 * @desc	Create new user
 * @route	POST /api/v1/users
 * @access	Public
 */
exports.addUser = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.password, salt);

		const user = await User.create({
			...req.body,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: 3600 * 24 }
		)

		return res.status(201).json({
			success: true,
			data: user,
			token: token
		})
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map(val => val.message);

			return res.status(400).json({
				success: false,
				error: messages
			})
		} else if (err.name === 'MongoError') {
			if (err.keyPattern.username) {
				return res.status(400).json({
					success: false,
					error: 'The username is taken.',
				})
			} else if (err.keyPattern.email) {
				return res.status(400).json({
					success: false,
					error: 'The email is taken.',
				})
			}
		}
		
		return res.status(500).json({
			success: false,
			error: 'Server error',
		})
	}
}

/**
 * @desc	Delete user
 * @route	DELETE /api/v1/users/:id
 * @access	Public
 */
exports.deleteUser = async (req, res, next) => {
    try {
		const user = await User.findById(req.params.id)

		if (!user) {
			return res.status(404).json({
				success: false,
				error: 'User not found'
			});
		}

		await user.remove();

		return res.status(200).json({
			success: true,
			data: {}
		});

	} catch (err) {
		return res.status(500).json({
			success: false,
			err: 'User not found',
		})
	}
}