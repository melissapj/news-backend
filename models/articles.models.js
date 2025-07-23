const db = require('../db/connection')

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

module.exports = fetchArticles