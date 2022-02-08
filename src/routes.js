import { Router } from "express";
import ArticleController from "./controller/ArticleController";

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: "Fullstack Challenge 2021 🏅 - Space Flight News" });
});

routes.get('/articles/:id', ArticleController.articleById);
routes.get('/articles/', ArticleController.allArticles)
routes.get('/page/:page', ArticleController.allArticlesPaginated);
routes.get('/get', ArticleController.getArticlesFromApi);


routes.put('/article/', ArticleController.editArticle);
routes.delete('/article/', ArticleController.deleteArticle);


export default routes;