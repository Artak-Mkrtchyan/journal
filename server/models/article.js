const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ArticleScema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	userId: {
		type: Object,
		required: true
	},
	date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('article', ArticleScema);
