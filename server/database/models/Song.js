const { Schema } = require('mongoose');
const connection = require('../../config/database');

const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
    required: true,
  },
  songId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Song = connection.model('Song', SongSchema);
module.exports = Song;
