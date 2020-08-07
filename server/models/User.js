const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: [true, 'Please enter username.'],
		unique: true,
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Please enter e-mail.'],
		unique: true,
	},
	password: {
		type: String,
		trim: false,
		required: [true, 'Please enter password.'],
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);