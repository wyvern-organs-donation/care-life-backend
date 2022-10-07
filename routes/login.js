var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const connectEnsureLogin = require('connect-ensure-login');
const { compare } = require("../utils/utils");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
var router = express.Router();

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, cb) => {
    // Check if user found
    const user = await prisma.users.findFirst(0);
    console.log(user)
    if (!user)
        return cb(null, false, {message: "No user found.", statusCode: 400});
  
    const validPassword = await compare(password, user.user_password);

    if (!validPassword) {
          return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', { message: req.flash('error')[0] });
});

  
router.post('/auth', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('secret', { title: 'Secret Page' })
);

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = router;
