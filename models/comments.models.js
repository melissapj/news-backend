const db = require('../db/connection')


const fetchCommentsByArticleId = (article_id) => {
    return db.query(`
        SELECT * FROM comments 
        WHERE article_id = $1
        ORDER BY created_at DESC;`
, [article_id])
    .then(({rows: comments}) => {
        if (comments.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        return {comments}
    })
}

const addCommentByArticleId = (article_id, username, body) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return db.query(`
        INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [article_id, username, body]);
    })
    .then(({ rows: comment }) => {
      return {comment};
    })
}

module.exports = { fetchCommentsByArticleId, addCommentByArticleId }