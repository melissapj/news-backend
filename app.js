const express = require('express')
const getTopics = require('./controllers/topics.controllers')
const getArticlesById = require('./controllers/articlesById.controller')
const getArticles = require('./controllers/articles.controller')
const getUsers = require('./controllers/users.controller')

const app = express()

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticlesById)

module.exports = app;