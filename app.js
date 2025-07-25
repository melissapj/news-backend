const express = require('express')
const getTopics = require('./controllers/topics.controllers')
const { getArticles, getArticlesById, patchArticleById } = require('./controllers/articles.controller')
const getUsers = require('./controllers/users.controller')
const {getCommentsByArticleId, postCommentByArticleId} = require('./controllers/comments.controller')

const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.patch('/api/articles/:article_id', patchArticleById)

app.use((req, res) => {
    res.status(404).send({msg: "Path Not Found"})
})

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400)
        res.send({msg: "Bad Request"})
    }
    else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status)
        res.send({msg: err.msg})
    }
    else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.stauts(500).send({msg: "Internal Server Error"})
})

module.exports = app;