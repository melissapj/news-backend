const db = require('../connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app')
const endpointsJson = require("../endpoints.json");
require("jest-sorted");

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
  test("200: checks topics is an object", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('topics')
      expect(typeof body).toBe("object")
    })
  })
  test("200: gets all topics", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body}) => {
      expect(body.topics.length).toBeGreaterThan(0)
    })
  })
  test("200: each topic has the correct properties", () => {
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
  test("200: gets all articles", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      expect(body.articles.length).toBeGreaterThan(0)
    })
  })
  test("200: each article is an object", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('articles');
      expect(typeof body).toBe("object");
    })
  })
  test("200: checks each article has the correct properties", () => {
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
  test("200: gets all users", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      expect(body.users.length).toBeGreaterThan(0)
    })
  })
  test("200: each user is an object", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('users');
      expect(typeof body).toBe("object");
    })
  })
  test("200: checks each user has the correct properties", () => {
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
  test("200: checks article is an object", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body}) => {
      expect(body).toHaveProperty('article');
      expect(typeof body).toBe("object");
    })
  })
  test("200: gets and article by its id with correct properties", () => {
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
  test("200: checks comments is an object", () => {
    return request(app)
    .get("/api/articles/5/comments")
    .expect(200)
    .then(({body}) => {
      expect(typeof body).toBe("object")
      expect(body).toHaveProperty("comments")
    })
  })
  test("200: gets all comments for an article_id", () => {
     return request(app)
    .get("/api/articles/5/comments")
    .expect(200)
    .then(({body}) => {
       expect(body.comments.length).toBeGreaterThan(0)
    })
  })
  test("200: each comment has the correct properties", () => {
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
  test("404: responds with an error message when a request is made for a article_id that is valid but not present in the database", () => {
    return request(app)
    .get("/api/articles/9999/comments")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Not Found")
    })
  })
})

describe("POST /api/articles/:article_id/comments", () => {
  test("200: checks the posted comment is an object", () => {
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }
  return request(app)
    .post("/api/articles/2/comments")
    .send(data)
    .expect(200)
    .then(({body}) => {
      const comment = body.comment[0]
      expect(typeof comment).toBe("object")
    })
  })
  test("200: checks the posted comment has correct properties", () => {
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }
  return request(app)
    .post("/api/articles/2/comments")
    .send(data)
    .expect(200)
    .then(({body}) => {
      const comment = body.comment[0]
      expect(typeof comment.comment_id).toBe("number")
      expect(typeof comment.article_id).toBe("number")
      expect(typeof comment.body).toBe("string")
      expect(typeof comment.votes).toBe("number")
      expect(typeof comment.author).toBe("string")
      expect(typeof comment.created_at).toBe("string")
    })
  })
  test("200: checks the total number of comments had gone up by 1", async () => {
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
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }
    return request(app)
    .post("/api/articles/wrong-data-type/comments")
    .send(data)
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe("Bad Request")
    })
  })
  test("404: responds with an error message when a request is made for a article_id that is valid but not present in the database", () => {
    const data = {
      username: "butter_bridge",
      body: "this is a test body"
    }
    return request(app)
    .post("/api/articles/9999/comments")
    .send(data)
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("Not Found")
    })
  })
})

describe("PATCH /api/articles/:article_id", () => {
  test("200: responds with an object", () => {
  const incVote = { inc_votes: 5 };
  return request(app)
    .patch("/api/articles/1")
    .send(incVote)
    .expect(200)
    .then(({body}) => {
      const articleUpdated = body.article[0]
      expect(typeof body).toBe("object");
      expect(articleUpdated.article_id).toBe(1);
      expect(typeof articleUpdated.article_id).toBe("number"); 
    });
  });
  test("200: adjusts votes correctly", () => {
    const incVote = { inc_votes: -1000 };
    return request(app)
    .patch("/api/articles/1")
    .send(incVote)
    .expect(200)
    .then(({ body }) => {
      const articleUpdated = body.article[0]
      expect(typeof articleUpdated.votes).toBe("number"); 
    })
  })
  test("400: invalid inc_votes value type", () => {
    const incVote = { inc_votes: "coffee" };
    return request(app)
    .patch("/api/articles/1")
    .send(incVote)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request"); 
    })
  })
  test("400: missing inc_votes key in request body", () => {
    const incVote = {};
    return request(app)
    .patch("/api/articles/1")
    .send(incVote)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request"); 
    })
  })
  test("400: invalid article_id type", () => {
    const incVote = { inc_votes: "5" }
    return request(app)
    .patch("/api/articles/not-a-number")
    .send(incVote)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request"); 
    })
  })
  test("404: article does not exist", () => {
    const incVote = { inc_votes: 5 }
    return request(app)
    .patch("/api/articles/9999")
    .send(incVote)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Not Found"); 
    })
  })
})

describe("DELETE /api/comments/:comment_id", () => {
  test("204: responds with an content", () => {
  return request(app)
    .delete("/api/comments/3")
    .expect(204)
    .then(({body}) => {
      expect(body).toEqual({})
    })
  })
  test("204: checks comments had decreased", async () => {

    const { rows: beforeRows } = await db.query(`SELECT * FROM comments;`);
    const beforeCount = beforeRows.length

    await request(app)
    .delete("/api/comments/3")
    .expect(204)

    const { rows: afterRows } = await db.query(`SELECT * FROM comments;`);
    const afterCount = afterRows.length

    expect(beforeCount - afterCount).toBe(1)
  })
  test("400: invalid comment_id type", () => {
    return request(app)
    .delete("/api/comments/not-a-number")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad Request"); 
    })
  })
  test("404: article does not exist", () => {
    return request(app)
    .delete("/api/comments/9999")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Not Found"); 
    })
  })
})

describe("GET /api/articles (sorting queries)", () => {
  test("200: default sort_by=created_at, order=desc", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
    test("200: sort_by=title, order=asc", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toBeSortedBy("title", { descending: false });
      });
  });

  test("200: sort_by=votes, order=desc", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=desc")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toBeSortedBy("votes", { descending: true });
      });
  });
  test("400: invalid sort_by column", () => {
  return request(app)
    .get("/api/articles?sort_by=banana")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Invalid sort_by query");
    });
  });
})

describe("GET /api/articles (topic query)", () => {
  test("200: gets articles with given topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(Array.isArray(articles)).toBe(true);
        articles.forEach(article => {
          expect(article.topic).toBe("cats");
        });
    });
  })
  test("200: returns all articles when no topic query is given", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThan(0);
      });
  });

  test("404: responds with error when topic does not exist", () => {
    return request(app)
      .get("/api/articles?topic=nonexistenttopic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic not found");
      });
  });
})

describe("GET /api/articles/:article_id and check comment count", () => {
  test("200: gets articles with given topic", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('article');
        expect(typeof body).toBe("object");
        const article = body.article;
        expect(Array.isArray(article)).toBe(true);
        expect(article.length).toBeGreaterThan(0);
        article.forEach(article => {
          expect(article).toHaveProperty("comment_count")
          expect(typeof article.comment_count).toBe("string")
        })
    });
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