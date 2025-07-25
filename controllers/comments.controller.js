const  {fetchCommentsByArticleId, addCommentByArticleId }  = require('../models/comments.models')

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

const postCommentByArticleId = (req, res, next) => {
    const { username, body } = req.body
    const { article_id } = req.params
    if (isNaN(Number(article_id))) {
      res.status(400)
      res.send({ status: 400, msg: "Bad Request" });
      return;
    }
    addCommentByArticleId(article_id, username, body)
    .then((comment) => {
        res.status(200);
        res.send(comment)
    })
    .catch((err) => {
        next(err)
    })
}


module.exports = { getCommentsByArticleId, postCommentByArticleId }