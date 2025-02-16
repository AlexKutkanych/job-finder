const router = require("express").Router();
const userRoutes = require("./user-routes");
const jobsRoutes = require('./jobs-routes');

router.use("/auth", userRoutes);
router.use('/jobs', jobsRoutes);

module.exports = router;
