import mongoose from 'mongoose';
import config from '../config/config';
export const connectDB = async (): Promise<any> => {
    const mongoDBUrl: string = config.DB_URL || "";
    await mongoose.connect(mongoDBUrl);
    mongoose.connection.on('error', err => {
        console.log(err);
        return Promise.reject(err);
    });
    return Promise.resolve(true);
};

export const disconnectDB = async (): Promise<any> => {
    try {
        await mongoose.disconnect();
        return Promise.resolve(true);
    } catch (error) {
        return Promise.resolve(false);
    }
};

