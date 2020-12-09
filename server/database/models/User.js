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
      sparse: true,
    },
  ],

  pendingFriendRequests: [
    {
      type: String,
      sparse: true,
    },
  ],
});

const User = connection.model('User', UserSchema);
module.exports = User;
