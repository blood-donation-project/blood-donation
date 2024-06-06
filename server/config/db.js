const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', err);
    }
}

module.exports = connectDB;
