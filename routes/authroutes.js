const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBody, schemas } = require('../middleware/validationMiddleware');
//const passport = require('passport');
//const passportConfig = require('../middleware/passportMiddleware');

router.route('/signup')
  router.post(validateBody(schemas.authSignupSchema), authController.signup);

/*router.route('/login')
  .post(validateBody(schemas.authLoginSchema), passport.authenticate('local', { session: false }), authController.login);

router.route('/google')
  .post(passport.authenticate('google-token', { session: false }), authController.googleAuth);

router.route('/facebook')
  .post(passport.authenticate('facebook-token', { session: false }), authController.facebookAuth);*/

module.exports = router;
