var express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../controllers/authenticationController');

const dotenv = require('dotenv');
dotenv.config();

var router = express.Router();

/* GET login page */
router.get('/login', function (req, res, next) {
  res.render('login', { message: "" });
});

/* Check login details */
router.post('/auth',
async (req, res, next) => {
  passport.authenticate(
    'local',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(400).json({info});
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.SECRET, { expiresIn: '120s' });

            return res.status(200).json({info, user:user.email, token: token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}
);

/* Accessible page with logged in user only */
router.get('/success', 
  passport.authenticate('jwt', { session: false }), 
  function(req, res) {
    res.status(200).json({ message: 'Página acessível com login'});
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logout com sucesso'});
  });
});

module.exports = router;
