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
      expect(body.length).toBe(3)
    })
  })
  test("each topic is an object", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const topic = body[0]
      expect(typeof topic).toBe("object")
    })
  })
  test ("each topic has the correct properties", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      const topic = body[0]
      expect(topic).toHaveProperty("slug")
      expect(topic).toHaveProperty("description")
  })
})
})