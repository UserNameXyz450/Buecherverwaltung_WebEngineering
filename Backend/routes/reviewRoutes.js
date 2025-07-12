const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
router.post('/reviews', reviewController.writeReview);
module.exports = router;