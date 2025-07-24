const fetchArticlesById  = require('../models/articlesById.models')

const getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticlesById(article_id)
    .then((article) => {
        //console.log(article)
        res.status(200);
        res.send(article)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = getArticlesById