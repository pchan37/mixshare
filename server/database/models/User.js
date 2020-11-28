const { Schema } = require('mongoose');
const connection = require('../../config/database');

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  receivedGiftPlaylists: [
    {
      gifterUserId: {
        type: String,
        required: true,
        unique: false,
      },
      message: {
        type: String,
        required: true,
        default: '',
      },
      playlistID: {
        type: String,
        required: true,
      },
    },
  ],

  receivedSongRecommendations: [
    {
      gifterUserId: {
        type: String,
        required: true,
        unique: false,
      },
      message: {
        type: String,
        required: true,
        default: '',
      },
      songID: {
        type: String,
        required: true,
      },
    },
  ],

  friends: [
    {
      type: String,
      unique: true,
    },
  ],

  pendingFriendRequests: [
    {
      type: String,
      unique: true,
    },
  ],
});

const User = connection.model('User', UserSchema);
module.exports = User;
