const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    isbn_13: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    author_s: {
        type: [String],
        required: true
    },
    description: {
        type: String,
    },
    coverImage: {
        type: String,
    }
});

module.exports = Book = mongoose.model('book', BookSchema);