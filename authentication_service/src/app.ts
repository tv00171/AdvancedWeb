import express from 'express';
import cors from "cors";

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
    }
}

export default new App().app;
