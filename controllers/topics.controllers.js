const fetchTopics = require('../models/topics.models')

const getTopics = (req, res) => {
    fetchTopics()
    .then((topics) => {
        res.status(200);
        res.send(topics)
    })
}

module.exports = getTopics