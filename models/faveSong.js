const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = ('./comment');

const faveSongSchema = new mongoose.Schema({
  api_id: {
    type: String,
    required: true,
    unique: true
  },
  faveDate:{
    type: Date,
    required: true,
    default: Date.now
  },
});

const faveSong = mongoose.model('faveSong', faveSongSchema);
module.exports = exports = faveSong;
