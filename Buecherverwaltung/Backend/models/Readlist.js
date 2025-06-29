const mongoose = require('mongoose');

const ReadlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
        //KI-generiert
        enum: ['to-read', 'currently-reading', 'read']
    },
    //Ki-generiert
    books: {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        },
        status: {
            type: String,
            enum: ['to-read', 'currently-reading', 'read']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }
});