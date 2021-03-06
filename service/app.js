var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tables = require('./routes/tables');
var session = require('./routes/session')
var user = require('./routes/user')

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(history())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:8080");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, content-type");
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.set("X-Powered-By", ' 3.2.1')
  res.set("Content-Type", "application/json;charset=utf-8");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
});
app.use('/', index);
app.use('/table', tables);
app.use('/session', session);
app.use('/user', user)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
