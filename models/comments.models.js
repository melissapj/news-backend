const db = require("../connection");

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `
    SELECT * FROM comments 
    WHERE article_id = $1
    ORDER BY created_at DESC;
  `,
      [article_id]
    )
    .then(({ rows: comments }) => {
      if (comments.length === 0) {
        return db
          .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
          .then(({ rows: articles }) => {
            if (articles.length === 0) {
              return Promise.reject({ status: 404, msg: "Not Found" });
            }
            return { comments: [] };
          });
      }
      return { comments };
    });
};
const addCommentByArticleId = (article_id, username, body) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return db.query(`SELECT * FROM users WHERE username = $1;`, [username]);
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not user with this username",
        });
      }
      return db.query(
        `
        INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING comment_id, author, body, votes, created_at;
      `,
        [article_id, username, body]
      );
    })
    .then(({ rows }) => {
      return { comment: rows[0] };
    });
};

const removeCommentByCommentId = (comment_id) => {
  return db
    .query(
      `
    SELECT * FROM comments 
    WHERE comment_id = $1;`,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return db
        .query(
          `
    DELETE FROM comments 
    WHERE comment_id = $1;`,
          [comment_id]
        )
        .then(({ rowCount }) => {
          return rowCount;
        });
    });
};

module.exports = {
  fetchCommentsByArticleId,
  addCommentByArticleId,
  removeCommentByCommentId,
};
