const express = require('express');
const path = require('path');

const getTopics = require('./controllers/topics.controllers');
const { getArticles, getArticlesById, patchArticleById } = require('./controllers/articles.controller');
const getUsers = require('./controllers/users.controller');
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentById } = require('./controllers/comments.controller');

const app = express();
app.disable('strict routing');

// Serve static files from /public at /api/static to avoid clash with API routes
app.use('/api/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());

// API root route — supports both /api and /api/
app.get(['/api', '/api/'], (req, res) => {
  res.status(200).send({
    endpoints: {
      topics: '/api/topics',
      articles: '/api/articles',
      users: '/api/users',
      comments: '/api/comments',
      static: '/api/static',
    }
  });
});

// Your API routes
app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get('/api/users', getUsers);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', patchArticleById);

app.delete('/api/comments/:comment_id', deleteCommentById);

// 404 handler — catch all unknown routes (must be after all other routes)
app.use((req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
});

// Error handlers

// Handle bad request errors (e.g., invalid IDs)
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

// Handle custom errors with status and msg
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

// Generic error handler for any other errors
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;