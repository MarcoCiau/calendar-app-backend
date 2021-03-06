import express, { Application } from "express";
import envConfig from "../config/config";
import { connectDB } from "../config/db";
import cors from "cors";
import authRoutes from "../routes/auth";
import eventRoutes from "../routes/event";

class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = envConfig.SERVER_PORT || '8000';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        /* enable cors */
        this.app.use(cors());
        /* parse application/json requests*/
        this.app.use(express.json());
        /* parse application/x-www-form-urlencoded requests. Only parse string or arrays*/
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use('/api/v1/auth', authRoutes);
        this.app.use('/api/v1/event', eventRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }

    getApp() {
        return this.app;
    }

    async init() {
        try {
            await connectDB();
            console.log('DB Connected!');
            this.listen();
        } catch (error) {
            console.log('Init Server Failed : ', error);
        }
    }
}
const server = new Server();
export default server;