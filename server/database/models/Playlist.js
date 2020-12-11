const { Schema } = require('mongoose');
const connection = require('../../config/database');

const PlaylistSchema = new Schema({
  playlistId: {
    type: String,
    required: true,
    unique: true,
  },
  ownerUsername: {
    type: String,
    required: true,
  },
  playlistName: {
    type: String,
    required: true,
  },
  mixtapeMode: {
    type: Boolean,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  songs: {
    type: [String],
    required: true,
  },
});

const Playlist = connection.model('Playlist', PlaylistSchema);
module.exports = Playlist;
