const { Schema } = require('mongoose');
const connection = require('../../config/database');

const AccountSchema = new Schema({
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

const Account = connection.model('Account', AccountSchema);
module.exports = Account;
