const db = require("../connection")

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
