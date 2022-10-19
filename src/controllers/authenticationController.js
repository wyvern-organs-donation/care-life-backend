var passport = require('passport');
const { compare } = require('../controllers/hashPassword');
const { PrismaClient } = require('@prisma/client');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const prisma = new PrismaClient();
const dotenv = require('dotenv');
dotenv.config();

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, cb) => {
      // Check if user found
      const user = await prisma.users.findFirst({ where: { email: email } });
      if (!user)
        return cb(null, false, { status: false, message: 'No user found.' });

      const validPassword = await compare(password, user.password);

      if (!validPassword) {
        return cb(null, false, { status: false, message: 'Incorrect username or password.' });
      }
      return cb(null, user, { status: true, message: 'Logged in successfully' });
    }
  )
);

// This verifies that the token sent by the user is valid
passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        // Find the user associated with the email provided by the user
        const user = await prisma.users.findFirst({
          where: {
            email: token.email,
          },
        });
        if (!user) {
          // If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found' });
        }

        // Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        done(error);
      }
    }
  )
);

/* Save the session of which user is logged in*/
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

/* Erases the login information that was saved */
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;