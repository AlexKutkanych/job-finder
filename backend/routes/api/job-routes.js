const router = require('express').Router();
const {
  searchJobs,
  searchJobsById,
  createJob,
  applyForJob,
  bookmarkJob
} = require('../../controllers/job-controller');

router.route('/search').post(searchJobs);
router.route('/create').post(createJob);
router.route('/:id').get(searchJobsById);
router.route('/bookmark').post(bookmarkJob);
router.route('/apply').post(applyForJob);

module.exports = router;
