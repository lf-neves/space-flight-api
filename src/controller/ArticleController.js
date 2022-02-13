import Article from '../model/Article'
import loadArticles from '../external/loadArticles';
import * as Yup from 'yup';

const articleExists = (article) => Article.find({ id: article.id }) ? true : false;

class ArticleController {

    async getArticlesFromApi(req, res) {
        const articles = await loadArticles();

        articles.every(async (article) => {
            if (!articleExists(article))
                await Article.create(article);
            else
                return false;
        });

        return res.json("Cron Service successfully realized");
    }

    async allArticles(req, res) {
        const articles = await Article.find();
        return res.json(articles)
    }

    async allArticlesPaginated(req, res) {
        const limit = 2;
        var { page } = req.params;
        page = parseInt(page);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const articles = await Article.find();

        if (startIndex < articles.length && endIndex <= articles.length) {
            const result = {}

            result.nextCursor = (endIndex !== articles.length) ? page + 1 : null;
            result.result = articles.slice(startIndex, endIndex);
            return res.json(result);
        } else
            return res.json(null);
    }

    async articleById(req, res) {
        const { id } = req.params;
        const article = await Article.find({ id: id })
        return res.json(article)
    }


    async editArticle(req, res) {

        const { id, title, summary, newsSite } = req.body;


        const article = await Article.find({ id: id });

        if (article)
            await Article.updateOne({ id: id }, {
                title,
                summary,
                newsSite,
            });

        return res.send();
    }

    async deleteArticle(req, res) {

        const { id } = req.body;

        const article = await Article.deleteOne({ id: id })

        console.log(article)

        return res.json(article)
    }

    async storeArticle(article) {
        return await Article.create(article);
    }
}

export default new ArticleController();