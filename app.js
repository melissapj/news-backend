const express = require("express");
const path = require("path");

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

const app = express();
app.disable("strict routing");

app.use("/api/static", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({
    endpoints: {
      "GET /api": {
        description:
          "serves up a json representation of all the available endpoints of the api",
      },
      "GET /api/articles": {
        description: "serves an array of all articles",
        exampleResponse: {
          articles: [
            {
              author: "weegembump",
              comment_count: 6,
              created_at: "2018-05-30T15:59:13.341Z",
              title: "Seafood substitutions are increasing",
              topic: "cooking",
              votes: 0,
            },
          ],
        },
      },
      "GET /api/topics": {
        description: "serves an array of all topics",
        exampleResponse: {
          topics: [
            {
              description: "Footie!",
              slug: "football",
            },
          ],
        },
        queries: [],
      },
    },
  });
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
