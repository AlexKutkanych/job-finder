const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { COOKIE_MAX_AGE } = require('../utils/constants');
const { handleError } = require('../utils/authErrorHandler');

// TODO: move super secret to env
const createToken = (id) =>
  jwt.sign({ id }, 'super secret string', { expiresIn: COOKIE_MAX_AGE });

const generateMockUserParams = () => {
  const randomImg = Math.round(Math.random(0, 5)) * 10;

  return {
    location: 'San Francisco, CA',
    avatar: `https://i.pravatar.cc/150?img=${randomImg}`,
    jobPosition: 'Software Engineer',
    university: 'Massachusetts Institute of Technology',
    languages: ['English', 'Ukrainian'],
  };
};

module.exports = {
  async loginUser(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all the fields' });
      }

      const user = await User.login(email, password);
      console.log(user, 'user');
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Wrong email and/or password!' });
      }

      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE * 1000,
      });

      return res.status(200).json({
        status: 'ok',
        message: 'User successfully logged in',
        user,
        hasToken: true,
      });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async signupUser(req, res) {
    try {
      const username = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all the fields' });
      }

      const user = await User.create({
        username,
        email,
        password,
        ...generateMockUserParams(),
      });

      const token = createToken(user._id);
      delete user.password;

      console.log(user);

      /* 
        to make cookies set in browser (due to different domains):
        - add localhost to cors whitelist
        - add withCredentials: true for axios
      */
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE * 1000,
      });
      res
        .status(201)
        .json({
          status: 'ok',
          message: 'User successfully created!',
          user,
          hasToken: true,
        });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async logoutUser(req, res) {
    try {
      res
        .status(201)
        .json({ status: 'ok', message: 'User successfully logged out!' });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
};
