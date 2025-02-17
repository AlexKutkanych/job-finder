const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { COOKIE_MAX_AGE } = require('../utils/constants');
const { handleError } = require('../utils/authErrorHandler');

module.exports = {
  async checkToken(req, res) {
    try {
      return res
        .status(200)
        .json({ status: 'ok', message: 'Token successful', hasToken: true });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async getProfile(req, res) {
    try {
      const user = await User.findById(req?.userId).select('-password');
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: 'User not found!' });
      }

      return res
        .status(200)
        .json({ status: 'ok', message: 'User profile', user });
    } catch (err) {
      const errors = handleError(err);
      return res.status(400).json({ errors });
    }
  },
};
