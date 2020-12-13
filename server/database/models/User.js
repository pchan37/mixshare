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
      giftId: {
        type: String,
        required: true,
      },
      gifterUserId: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
        default: '',
      },
      playlistId: {
        type: String,
        required: true,
      },
    },
  ],

  receivedSongRecommendations: [
    {
      giftId: {
        type: String,
        required: true,
      },
      gifterUserId: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
        default: '',
      },
      songId: {
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
