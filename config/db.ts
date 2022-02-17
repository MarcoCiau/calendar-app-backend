import mongoose from 'mongoose';
import config from '../config/config';
const connectDB = async (): Promise<any> => {
    const mongoDBUrl: string = config.DB_URL || "";
    await mongoose.connect(mongoDBUrl);
    mongoose.connection.on('error', err => {
        Promise.reject(err);
    });
    Promise.resolve(true);
};

export default connectDB;