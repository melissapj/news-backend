const fetchCommentsByArticleId = require('../models/commentsByArticleId.model');

const getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    fetchCommentsByArticleId(article_id)
    .then((article) => {
        res.status(200);
        res.send(article)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = getArticlesById