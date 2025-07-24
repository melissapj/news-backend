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
  test("topics is an object", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('topics')
      expect(typeof body).toBe("object")
    })
  })
  test("gets all topics", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      expect(body.topics.length).toBeGreaterThan(0)
    })
  })
  test("each topic has the correct properties", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const topics = body.topics
      topics.forEach((topic) => {
        expect(typeof topic.slug).toBe("string");
        expect(typeof topic.description).toBe("string");
      });
    })
  })
})

describe("GET /api/articles", () => {
  test("each article is an object", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('articles');
      expect(typeof body).toBe("object");
    })
  })
  test("gets all articles", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      expect(body.articles.length).toBeGreaterThan(0)
    })
  })
  test("each article has the correct properties", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      const articles = body.articles
      articles.forEach((article) => {
        expect(typeof article.author).toBe("string");
        expect(typeof article.title).toBe("string");
        expect(typeof article.article_id).toBe("number")
        expect(typeof article.topic).toBe("string")
        expect(typeof article.created_at).toBe("string")
        expect(typeof article.votes).toBe("number")
        expect(typeof article.article_img_url).toBe("string")
        expect(typeof article.comment_count).toBe("string")
      })
    })
  })
})

describe("GET /api/users", () => {
  test("each user is an object", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('users');
      expect(typeof body).toBe("object");
    })
  })
  test("gets all users", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      expect(body.users.length).toBeGreaterThan(0)
    })
  })
  test("each user has the correct properties", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      const users = body.users
      users.forEach((user) => {
        expect(typeof user.username).toBe("string")
        expect(typeof user.name).toBe("string")
        expect(typeof user.avatar_url).toBe("string")
      })
    })
  })
})

describe("GET /api/articles/:article_id", () => {
  test("article is an object", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('article');
      expect(typeof body).toBe("object");
    })
  })
  test("gets and article by its id with correct properties", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body}) => {
      const articleRecieved = body.article[0]
      expect(body.article).toHaveLength(1);
      expect(typeof articleRecieved.article_id).toBe("number")
      expect(typeof articleRecieved.title).toBe("string")
      expect(typeof articleRecieved.author).toBe("string")
      expect(typeof articleRecieved.body).toBe("string")
      expect(typeof articleRecieved.topic).toBe("string")
      expect(typeof articleRecieved.created_at).toBe("string")
      expect(typeof articleRecieved.votes).toBe("number")
      expect(typeof articleRecieved.article_img_url).toBe("string")
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

describe("GET /api/articles/:article_id/comments", () => {
  test("comments is an object", () => {
    return request(app)
    .get("/api/articles/5/comments")
    .expect(200)
    .then(({body}) => {
      expect(typeof body).toBe("object")
      expect(body).toHaveProperty("comments")
    })
  })
  test("gets all comments for an article_id", () => {
     return request(app)
    .get("/api/articles/5/comments")
    .expect(200)
    .then(({body}) => {
       expect(body.comments.length).toBeGreaterThan(0)
    })
  })
  test("each comment has the correct properties", () => {
    return request(app)
    .get("/api/articles/5/comments")
    .expect(200)
    .then(({body}) => {
      const comments = body.comments
      comments.forEach((comment) => {
        expect(typeof comment.comment_id).toBe("number")
        expect(typeof comment.votes).toBe("number")
        expect(typeof comment.created_at).toBe("string")
        expect(typeof comment.author).toBe("string")
        expect(typeof comment.body).toBe("string")
        expect(typeof comment.article_id).toBe("number")
      })
    })
  })
  test("400: responds with an error message when a request is made for an article_id of the wrong data type", () => {
    return request(app)
    .get("/api/articles/wrong-data-type/comments")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad Request")
    })
  })
  test("404: responds with an error message when a request is made for a snack_id that is valid but not present in the database", () => {
    return request(app)
    .get("/api/articles/9999/comments")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Not Found")
    })
  })
})

describe("POST /api/articles/:article_id/comments", () => {
  test("checks the posted comment is an object", () => {
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }
  return request(app)
    .post("/api/articles/2/comments")
    .send(data)
    .expect(200)
    .then(({body}) => {
      const comment = body[0]
      expect(typeof comment).toBe("object")
    })
  })
  test("checks the posted comment has correct properties", () => {
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }
  return request(app)
    .post("/api/articles/2/comments")
    .send(data)
    .expect(200)
    .then(({body}) => {
      const comment = body[0]
      expect(typeof comment.comment_id).toBe("number")
      expect(typeof comment.article_id).toBe("number")
      expect(typeof comment.body).toBe("string")
      expect(typeof comment.votes).toBe("number")
      expect(typeof comment.author).toBe("string")
      expect(typeof comment.created_at).toBe("string")
    })
  })
  test("checks the total number of comments had gone up by 1", async () => {
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }

     const { rows: beforeRows } = await db.query(`SELECT * FROM comments;`);
     const beforeCount = beforeRows.length

     await request(app)
      .post("/api/articles/2/comments")
      .send(data)
      .expect(200)

     const { rows: AfterRows } = await db.query(`SELECT * FROM comments;`);
     const AfterCount = AfterRows.length

     expect(AfterCount - beforeCount).toBe(1)
  })
  test("400: responds with an error message when a request is made for an article_id of the wrong data type", () => {
    return request(app)
    .get("/api/articles/wrong-data-type/comments")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad Request")
    })
  })
})