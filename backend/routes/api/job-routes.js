const router = require('express').Router();
const { searchJobs, createJob } = require('../../controllers/job-controller');

router.route('/search').post(searchJobs);
router.route('/create').post(createJob);
// router.route('/').get(getAllFlightouts);
// router.route('/:id').delete(deleteFlightout);

module.exports = router;
