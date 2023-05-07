import express from 'express';
import cors from "cors";
import authRoute from "./routes/authRoute";

class App {
    public app;

    constructor() {
        this.app = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/', authRoute)
    }
}

export default new App().app;
