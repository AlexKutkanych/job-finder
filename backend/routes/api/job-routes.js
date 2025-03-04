const router = require('express').Router();
const {
  searchJobs,
  searchJobsById,
  createJob,
  applyForJob,
  bookmarkJob,
} = require('../../controllers/job-controller');

router.route('/search').post(searchJobs);
router.route('/create').post(createJob);
router.route('/:id').get(searchJobsById);
router.route('/bookmark').patch(bookmarkJob);
router.route('/apply').patch(applyForJob);

module.exports = router;
