const express = require('express')
const db = require('./db/connection')
const getTopics = require('./controllers/topics.controllers')
const getArticles = require('./controllers/articles.controller')

const app = express()

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

module.exports = app;