var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.db, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connect')
});

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

var app = express();
// sphiFgHUY7uJ3d8l
// mongodb+srv://czauder:sphiFgHUY7uJ3d8l@cluster0-czbhp.mongodb.net/admin?retryWrites=true&w=majority

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: config.keySession,
  maxAge: config.maxAgeSession
}))

app.use((req, res, next) => {
  res.locals.path = req.path

  next();
})

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;