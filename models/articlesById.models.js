const db = require('../db/connection')


const fetchArticlesById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        const article = rows[0]
        return article
    })
}


module.exports = fetchArticlesById;