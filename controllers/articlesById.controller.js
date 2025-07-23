const fetchArticlesById  = require('../models/articlesById.models')

const getArticlesById = (req, res) => {
    const { article_id } = req.params
    fetchArticlesById(article_id)
    .then((article) => {
        if (article === undefined) {
          res.status(500).send({ msg: "Article not found" });
        }
        res.status(200);
        res.send(article)
    })
}

module.exports = getArticlesById