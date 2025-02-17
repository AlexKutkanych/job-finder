const router = require('express').Router();
const jobRoutes = require('./api/job-routes');
const authRoutes = require('./api/auth-routes');
const userRoutes = require('./api/user-routes');

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
