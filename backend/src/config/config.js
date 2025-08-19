import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
}

export default config;
