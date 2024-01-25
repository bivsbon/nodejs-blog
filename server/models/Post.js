const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now() - Math.floor(Math.random() * 60)
  },
  updatedAt: {
    type: Date,
    default: Date.now() - Math.floor(Math.random() * 60)
  }
});

module.exports = mongoose.model('Post', PostSchema);