const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookies = require('cookie-session');

const indexRouter = require('./routes/notes');
const usersRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookies({
  name: 'session',
  keys: ["key1", "key2"],
  
  //degrade cookies after 24 hrs
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api', usersRouter);

module.exports = app;
