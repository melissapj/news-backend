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

describe("*", () => {
  test("ALL METHODS: responds with a 404 not found message when a request is made to an endpoint with doesn\'t exist on the api", () => {
    return request(app)
    .get("/not-an-endpoint")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Path Not Found")
    })
  })
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

describe("GET /api/users", () => {
  test("gets all users", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      const users = body.users
      expect(users.length).toBe(4)
    })
  })
  test("each user is an object", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      const users = body.users
      const user = users[0]
      expect(typeof user).toBe("object")
    })
  })
  test("each user has the correct properties", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      const users = body.users
      const user = users[0]
      expect(user).toHaveProperty("username")
      expect(user).toHaveProperty("name")
      expect(user).toHaveProperty("avatar_url")
    })
  })
})

describe("GET /api/articles/:article_id", () => {
  test("each article is an object", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body: article}) => {
      expect(typeof article).toBe("object")
    })
  })
  test("gets and article by its id", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body: article}) => {
      expect(article.article_id).toBe(2)
      expect(article.title).toBe("Sony Vaio; or, The Laptop")
      expect(article.author).toBe("icellusedkars")
      expect(article.body).toBe("Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.")
      expect(article.topic).toBe("mitch")
      expect(article.created_at).toBe("2020-10-16T05:03:00.000Z")
      expect(article.votes).toBe(0)
      expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
    })
  })
  test("400: responds with an error message whe na request is made for an article_id of the wrong data type", () => {
    return request(app)
    .get("/api/articles/wrong-data-type")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad Request")
    })
  })
  test("404: responds with an error message when a request is made for a snack_id that is valid but not present in the database", () => {
    return request(app)
    .get("/api/articles/9999")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Not Found")
    })
  })



})