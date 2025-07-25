const db = require('../db/connection')
const { articleData } = require('../db/data/test-data')

const fetchArticles = () => {
  return db.query(`
  SELECT
  articles.article_id,
  articles.author,
  articles.title,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT (comments.comment_id) AS comment_count
  FROM articles
  FULL JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY
  articles.article_id,
  articles.author,
  articles.title,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url
  ORDER BY articles.created_at desc;`)
  .then(({rows: articles}) => {
      return articles
  })
}

const fetchArticlesById = (article_id) => {
  return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
  .then(({rows: article}) => {
      const articleNeeded = {article}
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found"})
      }
      return articleNeeded
  })
}

const adjustArticleVotes = (article_id, inc_votes) => {
  return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
  .then(({rows}) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return db.query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [inc_votes, article_id])
    .then(({ rows: article }) => {
    return {article}
    })
  })
}


module.exports = { fetchArticlesById, fetchArticles, adjustArticleVotes }