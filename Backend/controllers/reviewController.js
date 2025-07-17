const Review = require("../models/Review");
const User = require("../models/User");

exports.writeReview = async (req, res) => {
    console.log("Received request body:", req.body);
    try {
        const { bookId, rating, review } = req.body;
        const userId = req.user._id;

        if (!bookId || rating === undefined) {
            return res.status(400).json({
                message: "Book data and rating are required in reviewController.",
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

        const existingReview = await Review.findOne({ bookId: bookId, user: userId });
        if (existingReview) {
            existingReview.review = review;
            existingReview.rating = rating;
            existingReview.updatedAt = new Date();
            await existingReview.save();
            res.status(201).json({
                message: "Review edited and saved",
                addedEntry: existingReview,
            });
        } else {
            const newReview = new Review({
                bookId: bookId,
                user: userId,
                review: review,
                rating: rating,
                createdAt: new Date(),
            });
            await newReview.save();
            res.status(200).json({
                message: "Review created and saved",
                addedEntry: newReview,
            });
        }

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found while trying to write review..",
            });
        }
    } catch (error) {
        console.error("ERror in writeReview reviewcontroller", error);
        res.status(500).json({
            message: "Issue with reviewcontroller",
        });
    }
};

exports.getReviewOfBookAndUser = async (req, res) => {
    try {
        const { bookId } = req.params;
        const review = await Review.findOne({ user: req.user._id, bookId: bookId });
        res.status(200).json(review);
    } catch (error) {
        console.error("Error in getReviewForBook");
    }
};

exports.getReviewsOfBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({ bookId: bookId }).populate("user", "username profilePic");
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error in getReviewForBook: " + error);
    }
};

exports.getReviewsOfUser = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id });
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error in getReviewForBook");
    }
};
