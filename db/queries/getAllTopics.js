const db = require("../connection");

db.query(`SELECT * FROM topics;`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    db.end();
  });
  