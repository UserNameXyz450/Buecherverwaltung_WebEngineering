const Review = require("../models/Review");
const User = require("../models/User");

exports.writeReview = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const { book, rating, review } = req.body;
    const userId = req.user._id;

    if (!book || rating === undefined) {
      return res.status(400).json({
        message: "Book data and rating are required in reviewController.",
      });
    }

    const localBook = await Book.findOneAndUpdate(
      {apiId: bookData.apiId},
      {$set: bookData},
      {new: true, upsert: true}
    )

    const newReadEntry = {
      book: book,
      rating: rating,
      review: review,
      createdAt: new Date(),
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { read: newReadEntry },
        $pull: {
          tbr: {
            apiId: book.apiId,
          },
          currentlyReading: {
            apiId: book.apiId,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found while trying to write review.." });
    }

    res.status(201).json({
      message: "Review created and added",
      addedEntry: newReadEntry,
    });
  } catch (error) {
    console.error("ERror in writeReview reviewcontroller", error);
    res.status(500).json({ message: "Issue with reviewcontroller", review });
  }
};

exports.getReviewForBook = async (req, res) => {
  try {
    const { bookId } = req.params;
  }
}
