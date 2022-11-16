var express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../controllers/AuthenticationController');

const dotenv = require('dotenv');
dotenv.config();

var router = express.Router();

// Check login details 
router.post('/auth',
// #swagger.tags = ['Login']
// #swagger.description = 'Endpoint realizar autenticação.'

/* #swagger.parameters['email'] = {
    description: 'Email do usuário.',
    type: 'string'
} */
/* #swagger.parameters['password'] = {
    description: 'Senha do usuário.',
    type: 'string'
} */
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
            const token = jwt.sign({ user: body }, process.env.SECRET, { expiresIn: '24h' });

            return res.status(200).json({info, user:user, token: token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});

router.get('/logout', (req, res, next) => {
  // #swagger.tags = ['Login']
  // #swagger.description = 'Endpoint realizar logout.'

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logout com sucesso'});
  });
});

module.exports = router;
