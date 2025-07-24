const postCommentByArticleId  = require('../models/postCommentByArticleId.model')

const addCommentByArticleId = (req, res, next) => {
    const { username, body } = req.body
    const { article_id } = req.params
    postCommentByArticleId(article_id, username, body)
    .then((comment) => {
        res.status(200);
        res.send(comment)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = addCommentByArticleId