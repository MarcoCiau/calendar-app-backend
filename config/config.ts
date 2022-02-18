import dotenv from "dotenv";
dotenv.config();
export default {
    NODE_ENV: process.env.ENV,
    SERVER_PORT : process.env.PORT,
    DB_URL: process.env.MONGODB_SRV,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || '1234567890ABCDEFGHIJK',
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || '1234567890ABCDEFGHIJK',
};