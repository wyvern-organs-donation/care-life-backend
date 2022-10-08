var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var passport = require('passport');
var session = require('express-session');

var home = require('./routes/home');
var users = require('./routes/users');
var register = require('./routes/registerUser');
var registerTypeUser = require('./routes/regiterTypeUser');
var registerTypeOrgan = require('./routes/registerTypeOrgan');
var registerOrgan = require('./routes/registerOrgan');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'super secret key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate('session'));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/users', users);
app.use('/register', register);
app.use('/register/typeuser', registerTypeUser);
app.use('/register/typeorgan', registerTypeOrgan);
app.use('/register/organ', registerOrgan);
app.use(login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
