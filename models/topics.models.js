const db = require('../connection')

const fetchTopics = () => {
    return db.query(`SELECT slug, description FROM topics`)
    .then(({rows: topics}) => {
        return topics
    })
}

module.exports = fetchTopics