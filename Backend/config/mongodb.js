const mongoose = require('mongoose');
const config = require('dotenv');

config.config();

const mongodb = config.MONGO_URI;

const setupConnectionToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = setupConnectionToDB;