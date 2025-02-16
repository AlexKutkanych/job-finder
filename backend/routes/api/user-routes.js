const router = require('express').Router();
const {
  loginUser,
  signupUser,
  logoutUser,
} = require('../../controllers/user-controller');

router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/signup').post(signupUser);

module.exports = router;
