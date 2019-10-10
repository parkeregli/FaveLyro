const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = ('./comment').schema;

const faveSongSchema = new mongoose.Schema({
  api_id: {
    type: String,
    required: true,
    unique: true
  },
  fave_date:{
    type: Date,
    required: true,
    default: Date.now
  },
  full_title: {
    type: String,
    required: true
  },
  lyric_url:{
    type: String,
    required: true
  },
  comments: [{type: Schema.Types.ObjectId, ref: commentSchema}]
});

const faveSong = mongoose.model('faveSong', faveSongSchema);
module.exports = exports = faveSong;
