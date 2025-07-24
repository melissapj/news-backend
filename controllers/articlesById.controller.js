const fetchCommentsByArticleId  = require('../models/articlesById.models')

const getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    fetchCommentsByArticleId(article_id)
    .then((comments) => {
        res.status(200);
        res.send(comments)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = getCommentsByArticleId