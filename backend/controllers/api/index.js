const router = require("express").Router();
const userRoutes = require("./user-routes");
const flightoutRoutes = require('./jobs-routes');

router.use("/auth", userRoutes);
router.use('/jobs', flightoutRoutes);

module.exports = router;
