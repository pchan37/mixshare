const { Schema } = require('mongoose');
const connection = require('../../config/database');

const SongSchema = new Schema({
  songId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const Song = connection.model('Song', SongSchema);
module.exports = Song;
