const router = require('express').Router();

router.post('/signup', (req, res) => {
  console.log(req);
  const username = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!username || !email || !password) {
    res.send({ status: 'err', message: 'Please enter all the fields' });
  }
  console.log('/signup', username, email, password);

  res.send({ status: 'ok', message: 'User created' });
});

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

module.exports = router;
