const express = require("express");
const path = require("path");
const cors = require('cors');
const endpointsJson = require("./endpoints.json");
const app = express();

const getTopics = require("./controllers/topics.controllers");
const {
  getArticles,
  getArticlesById,
  patchArticleById,
} = require("./controllers/articles.controller");
const getUsers = require("./controllers/users.controller");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} = require("./controllers/comments.controller");


app.use(cors());

app.disable("strict routing");

app.get("/api/cors-test", (req, res) => {
  res.json({ message: "CORS should be working" });
});

app.use("/api/static", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.use((req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
