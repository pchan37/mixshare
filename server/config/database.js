const { createConnection } = require('mongoose');

const { MONGODB_URI = 'mongodb://localhost:27017/mixshare' } = process.env;

const connection = createConnection(MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

module.exports = connection;
