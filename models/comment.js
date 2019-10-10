const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const faveSong = require('./faveSong');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const comment = mongoose.model('comment', commentSchema);
module.exports = exports = comment;
