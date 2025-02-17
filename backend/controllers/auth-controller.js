const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { COOKIE_MAX_AGE } = require('../utils/constants');
const { handleError } = require('../utils/authErrorHandler');

// TODO: move super secret to env
const createToken = (id) =>
  jwt.sign({ id }, 'super secret string', { expiresIn: COOKIE_MAX_AGE });

module.exports = {
  async loginUser(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all the fields' });
      }

      const user = await User.login(email, password);
      if (!user) {
        return res.status(400).json({ message: 'Wrong email and/or password!' });
      }

      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE * 1000,
      });

      return res.status(200).json({ status: 'ok', message: 'User successfully logged in' })
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

      const user = await User.create({ username, email, password });
      const token = createToken(user._id);

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
        .json({ status: 'ok', message: 'User successfully created!' });
    } catch (err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    }
  },
  async logoutUser() {},
};


// router.post("/login", (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   }).then((dbUserData) => {
//     if (!dbUserData) {
//       res.status(400).json({
//         message: "No user with that email address!",
//       });
//       return;
//     }
//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password!" });
//       return;
//     }
//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.email = dbUserData.email;
//       req.session.loggedIn = true;
//       console.log(req.session.loggedIn);

//       res.json({ user: dbUserData, message: "You are now logged in!" });
//     });
//   });
// });

// router.post("/logout", (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.json({ message: "You are logout" });
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// module.exports = router;
