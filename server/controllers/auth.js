const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc	Auth user
 * @route	POST /api/v1/auth
 * @access	Public
 */
exports.authUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				success: false,
				error: 'User does not exist'
			})
		}

		const isMatch = bcrypt.compareSync(password, user.password)

		if (!isMatch) {
			return res.status(400).json({
				success: false,
				error: 'Invalid credentials'
			})
		}

		const token = jwt.sign(
			{ id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: 3600 * 24 }
		)

		res.cookie('jwt_token', token, { httpOnly: true });

		user.password = undefined;

		return res.status(201).json({
			success: true,
			data: user,
			token: token
		})
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		})
	}
}

/**
 * @desc	Get user data
 * @route	GET /api/v1/auth/user
 * @access	Private
 */
exports.getUserData = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		return res.status(201).json({
			success: true,
			data: user
		});
	} catch (err) {
		throw err;
	}
}