const db = require("../connection");

db.query(`SELECT * FROM articles WHERE topic = 'coding';`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.end();
  });