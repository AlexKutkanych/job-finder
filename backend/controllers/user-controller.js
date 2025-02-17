const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { COOKIE_MAX_AGE } = require('../utils/constants');
const { handleError } = require('../utils/authErrorHandler');

module.exports = {
  async getProfile(req, res) {
    try {
      // const user = await User.login(email, password);
      // if (!user) {
      //   return res.status(400).json({ message: 'Wrong email and/or password!' });
      // }

      return res
        .status(200)
        .json({ status: 'ok', message: 'User profile' });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
};
