const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requred: true
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

module.exports.Review = mongoose.model("review", ReviewSchema);
module.exports.ReviewSchema = ReviewSchema;
