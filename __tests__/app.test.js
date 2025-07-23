const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app')
const endpointsJson = require("../endpoints.json");

beforeEach(() => {
  return seed(testData)
});

afterAll(() => {
  return db.end()
})

describe("GET /api", () => {
  test.skip("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("gets all topics", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const topics = body.topics
      expect(topics.length).toBe(3)
    })
  })
  test("each topic is an object", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const topics = body.topics
      const topic = topics[0]
      expect(typeof topic).toBe("object")
    })
  })
  test("each topic has the correct properties", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const topics = body.topics
      const topic = topics[0]
      expect(topic).toHaveProperty("slug");
      expect(topic).toHaveProperty("description")
    })
  })
})

describe("GET /api/articles", () => {
  test("gets all articles", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      const articles = body.articles
      expect(articles.length).toBe(13)
    })
  })
  test("each article is an object", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      const articles = body.articles
      const article = articles[0]
      expect(typeof article).toBe("object")
    })
  })
  test("each article has the correct properties", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      const articles = body.articles
      const article = articles[0]
      expect(article).toHaveProperty("author")
      expect(article).toHaveProperty("title")
      expect(article).toHaveProperty("article_id")
      expect(article).toHaveProperty("topic")
      expect(article).toHaveProperty("created_at")
      expect(article).toHaveProperty("votes")
      expect(article).toHaveProperty("article_img_url")
      expect(article).toHaveProperty("comment_count")
    })
  })
})