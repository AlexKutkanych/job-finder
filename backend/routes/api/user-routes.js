const router = require('express').Router();
const { getProfile } = require('../../controllers/user-controller');
const { requireAuth } = require('../../middleware/auth-middleware');

router.use(requireAuth);

router.route('/profile').get(getProfile);

module.exports = router;
