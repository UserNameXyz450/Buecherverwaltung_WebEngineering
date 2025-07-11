const Review = require('../models/Review');
const User = require('../models/User');

exports.writeReview = async (req, res) => {
    try {
        const {bookId, rating, comment} = req.body;
        const userId = req.user._id;

        const newReview = new Review({
            book: bookId,
            user: userId,
            rating,
            comment
        });
        await newReview.save();

        await User.findByIdAndUpdate(userId, {
            $addToSet: { read: newReview._id },
            $pull: {tbr: bookId, currentlyReading: bookId}
        });

        res.status(200).json({ message: 'Review created and added.', review: newReview});
    } catch (error) {
        res.status(500).json({message: 'Issue with reviewController', error});
    }
}