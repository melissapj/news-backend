const db = require('../db/connection')


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


module.exports = fetchArticlesById;