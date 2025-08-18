import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGODB_URL: process.env.MONGODB_URL,
}

export default config;
