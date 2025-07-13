const Review = require("../models/Review");
const User = require("../models/User");

exports.writeReview = async (req, res) => {
    console.log("Received request body:", req.body);
    try {
        const { bookId, rating, review } = req.body;
        const userId = req.user._id;

        if (!bookId || rating === undefined) {
            return res.status(400).json({
                message:
                    "Book data and rating are required in reviewController.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { read: bookId },
                $pull: {
                    tbr: bookId,
                    currentlyReading: bookId,
                },
            },
            { new: true }
        );

        const newReview = new Review({
            bookId: bookId,
            user: userId,
            review: review,
            rating: rating,
            createdAt: new Date(),
        });

        await newReview.save();

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found while trying to write review..",
            });
        }

        res.status(201).json({
            message: "Review created and saved",
            addedEntry: newReview,
        });
    } catch (error) {
        console.error("ERror in writeReview reviewcontroller", error);
        res.status(500).json({
            message: "Issue with reviewcontroller",
            review,
        });
    }
};

exports.getReviewForBook = async (req, res) => {
    try {
        const { bookId } = req.params;
    } catch (error) {
        console.error("Error in getReviewForBook");
    }
};
