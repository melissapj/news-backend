const express = require('express')
const db = require('./db/connection')
const getTopics = require('./controllers/topics.controllers')

const app = express()

app.get('/api/topics', getTopics)

module.exports = app;