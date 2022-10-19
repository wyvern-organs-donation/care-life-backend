var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
var sessions = require('express-session')

var indexRouter = require('./src/routes/home');
var usersRouter = require('./src/routes/users');
var registerRouter = require('./src/routes/registerUser');
var registerTypeUserRouter = require('./src/routes/regiterTypeUser');
var registerTypeOrganRouter = require('./src/routes/registerTypeOrgan');
var registerOrganRouter = require('./src/routes/registerOrgan');
var loginRouter = require('./src/routes/login');
var confirmRegistrationRouter = require('./src/routes/confirmRegistration')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());//initializes passport configuration
app.use(express.static(path.join(__dirname, 'public')));

const dotenv = require('dotenv');
dotenv.config();

app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));

app.use(indexRouter);
app.use(usersRouter);
app.use(registerRouter);
app.use(registerTypeUserRouter);
app.use(registerTypeOrganRouter);
app.use(registerOrganRouter);
app.use(loginRouter);
app.use(confirmRegistrationRouter);


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
