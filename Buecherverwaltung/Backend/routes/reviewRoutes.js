const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
router.post('/', reviewController.writeReview);
module.exports = router;