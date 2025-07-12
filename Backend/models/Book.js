const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    apiId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
    },
    author_s: {
        type: [String],
    },
    description: {
        type: String,
    },
    coverImage: {
        type: String,
    }
});

module.exports.Book = mongoose.model('book', BookSchema);
module.exports.BookSchema = BookSchema;