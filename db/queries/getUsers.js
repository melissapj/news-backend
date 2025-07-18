const db = require("../connection");

db.query(`SELECT * FROM users;`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.end();
  });
  