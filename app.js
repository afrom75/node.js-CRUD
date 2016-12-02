var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/node-express');
mongoose.Promise = global.Promise;

var index = require('./app/routes/index');
var users = require('./app/routes/users');
var cars = require('./app/routes/cars');

var app = express();
var config = require('./config');
var session = require('express-session');

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if(req.query._method === "DELETE") {
    req.method = "DELETE";
  }
  if(req.body._method === "PUT" || req.query._method === "PUT") {
    req.method = "PUT";
  }
  next();
});

app.use((req, res, next) => {
  console.log(req.method, req.url);
  console.log('query',req.query);
  console.log('body',req.body);
  next();
});

app.use(function(req, res, next){
  if(true || req.session.user || req.url === '/signin' || req.url === '/subscribe'){
    next()
  }
  else{
    res.redirect('/signin');
  }
})

app.use('/', index);
app.use('/users', users);
app.use('/cars', cars);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
