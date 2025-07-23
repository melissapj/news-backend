const db = require('../db/connection')

const fetchTopics = () => {
    return db.query(`SELECT slug, description FROM topics`)
    .then(({rows: topics}) => {
        return topics
    })
}

module.exports = fetchTopics