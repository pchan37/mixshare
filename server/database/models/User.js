const { Schema } = require('mongoose');
const connection = require('../../config/database');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = connection.model('User', UserSchema);
module.exports = User;
