import mongoose from 'mongoose';
import config from '../config/config.js';

function connectDB() {
    mongoose.connect(config.MONGODB_URL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB', error);
        });
}

export default connectDB;