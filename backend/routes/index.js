const router = require('express').Router();
const jobRoutes = require('./api/job-routes');

// router.use("/auth", userRoutes);
router.use('/jobs', jobRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
