import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;


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

model('article', ArticleScema);
