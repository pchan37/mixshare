const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(+process.env.PORT || 3001, () => {
  console.log('Listening on port 3001...');
});

module.exports = app;
