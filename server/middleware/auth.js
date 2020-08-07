const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {	
	const token = req.header('x-auth-token');

	if (!token) {
		res.status(401).json({
			success: false,
			error: 'No token, authorization denied'
		})
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(400).json({
			success: false,
			error: 'Token is not valid'
		})
	}
}

module.exports = auth;