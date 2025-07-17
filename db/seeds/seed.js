const db = require("../connection")
const format = require('pg-format');
const { convertTimestampToDate } = require('./utils');

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`DROP TABLE IF EXISTS comments`)
  .then (() => {
    return db.query(`DROP TABLE IF EXISTS articles`)
  })
  .then (() => {
    return db.query(`DROP TABLE IF EXISTS users`)
  })
  .then (() => {
    return db.query(`DROP TABLE IF EXISTS topics`)
  })
  .then(() => {
    return createTopics()

  })
  .then(() => {
    return createUsers()
  })
  .then(() => {
    return createArticles()
  })
  .then(() => {
    return createComments()
  })
  .then(() => {
    const formattedTopics = topicData.map((topic) => {
      return [topic.description, topic.slug, topic.img_url]
    })
    const queryString = format(
      `INSERT INTO 
       topics (description, slug, img_url)
       VALUES %L`,
       formattedTopics
    );
    return db.query(queryString)
  })
  .then(() => {
    const formattedUsers = userData.map((users) => {
      return [users.username, users.name, users.avatar_url]
    })
    const queryString = format(
      `INSERT INTO
       users (username, name, avatar_url)
       VALUES %L`,
       formattedUsers
    );
    return db.query(queryString)
  })
  .then(() => {
    const transformedArticleData = articleData.map(convertTimestampToDate);
    const formattedArticles = transformedArticleData.map((article) => {
      return [article.title, article.topic, article.author, article.body, article.created_at, article.votes, article.article_img_url]
    })
    const queryString = format(
      `INSERT INTO
       articles (title, topic, author, body, created_at, votes, article_img_url)
       VALUES %L`,
       formattedArticles
    );
    return db.query(queryString)
  })
  .then(() => {
    const transformedCommentData = commentData.map(convertTimestampToDate);
     const formattedComments = transformedCommentData.map((comment) => {
        const matchingArticle = articleData.find(
      (article) => article.title === comment.article_title
    );
    return [matchingArticle.article_id, comment.body, comment.votes, comment.author, comment.created_at];
  });
    const queryString = format(
      `INSERT INTO
       comments (article_id, body, votes, author, created_at)
       VALUES %L`,
       formattedComments
    );
    return db.query(queryString)
  })
}

function createTopics() {
  const query = 
  `CREATE TABLE topics(
    slug VARCHAR(250) PRIMARY KEY,
    description VARCHAR(250),
    img_url VARCHAR(1000)
    );`

    return db.query(query)
}
function createUsers() {
  const query = 
  `CREATE TABLE users(
    username VARCHAR(250) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    avatar_url VARCHAR(1000) NOT NULL
    );`
    return db.query(query)
}
function createArticles() {
  const query = 
  `CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    topic VARCHAR(200) REFERENCES topics(slug) NOT NULL,
    author VARCHAR(200) REFERENCES users(username) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000) NOT NULL
    );`
    return db.query(query)
}
function createComments() {
  const query = 
  `CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    author VARCHAR(200) REFERENCES users(username) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
    return db.query(query)
}




module.exports = seed;
