import express from 'express';
import cors from "cors";
import posts_route from "./routes/posts_route";
import authMiddleware from "./middlewares/authMiddleware";

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
        this.app.use(authMiddleware)
    }

    routes() {
        this.app.use('/', posts_route)
    }
}

export default new App().app;
