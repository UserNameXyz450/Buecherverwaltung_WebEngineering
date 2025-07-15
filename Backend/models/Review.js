const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        //Rest von rating mit KI-generiert
        required: [true, "Please provide a rating between 1 and 5!"],
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

ReviewSchema.index({ bookId: 1, user: 1 }, { unique: true });

const Review = mongoose.model("review", ReviewSchema);
module.exports = Review
