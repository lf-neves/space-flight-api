import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron';
import routes from './routes';
import ArticleController from './controller/ArticleController';

class App {
    constructor() {
        this.server = express();

        mongoose.connect('mongodb+srv://fruitProd:novasenh4@fuitprod.qoyc1.mongodb.net/fruitProd?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUNifiedTopology: true,
        });

        cron.schedule("0 0 9 * * *", async () => {
            console.log("EXECUTING CRON JOB");
            await ArticleController.getArticlesFromApi();
        });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
