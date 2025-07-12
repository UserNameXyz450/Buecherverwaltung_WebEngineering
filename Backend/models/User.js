const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {BookSchema} = require('./Book');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    followers: {
        type: Number
    },
    aboutYou: {
        type: String
    },
    profilePic: {
        type: String
    },

    tbr: [BookSchema],

    currentlyReading: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    }],

    read: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }]
});

UserSchema.pre(
    'save',
    async function(next) {

        //KI-generiert
        if(!this.isModified('password')) return next();

        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const User = mongoose.model('user', UserSchema);

module.exports = User;