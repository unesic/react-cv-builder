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
	slug: {
		type: String,
		trim: true,
		required: true,
	},
	data: {
		type: String,
		trim: true,
		required: false,
	},
}, {
	timestamps: true
});

module.exports = mongoose.model('Page', PageSchema);