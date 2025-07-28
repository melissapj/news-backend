const { fetchArticles, fetchArticlesById, adjustArticleVotes } = require('../models/articles.models')

const getArticles = (req, res, next) => {
    const { sort_by, order } = req.query;
    fetchArticles(sort_by, order)
    .then((articles) => {
        res.status(200);
        res.send( {articles} )
    })
    .catch((err) => {
        next(err)
    })
}

const getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticlesById(article_id)
    .then((article) => {
        res.status(200);
        res.send(article)
    })
    .catch((err) => {
        next(err)
    })
}

const patchArticleById = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes} = req.body
    if (typeof inc_votes !== "number" || isNaN(Number(article_id))) {
      res.status(400)
      res.send({ status: 400, msg: "Bad Request" });
    }
    adjustArticleVotes(article_id, inc_votes)
    .then((article) => {
        res.status(200);
        res.send(article)
    })
    .catch((err) => {
        next(err)
    })
}



module.exports = { getArticles, getArticlesById, patchArticleById }