const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
router.get('/user/reviews', reviewController.getReviewsOfUser);
router.post('/books/:bookId/reviews', reviewController.writeReview);
router.get('/books/:bookId/reviews', reviewController.getReviewsOfBook);
router.get('/books/:bookId/review', reviewController.getReviewOfBookAndUser);
module.exports = router;