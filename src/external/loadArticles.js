import { api } from '../services/api';
import ArticleController from '../controller/ArticleController';

export default async function loadArticles() {
    const { data } = await api.get("/articles");
    return await ArticleController.storeArticle(data);
}