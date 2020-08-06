const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
	ownerId: {
		type: String,
		required: [true, 'Please login or create account before saving.'],
	},
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add page title.'],
	},
	data: {
		type: String,
		trim: true,
		required: [true, 'Please create at least one section before saving.'],
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Page', PageSchema);