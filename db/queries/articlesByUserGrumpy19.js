const db = require("../connection");

db.query(`SELECT * FROM articles WHERE author = 'grumpy19';`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.end();
  });
  