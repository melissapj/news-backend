const db = require("../connection");

db.query(`SELECT * FROM comments WHERE votes > 10;`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.end();
  });
  