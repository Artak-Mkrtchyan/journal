import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const UserScema = new Schema({
	name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  articlesList: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

model('users', UserScema);
