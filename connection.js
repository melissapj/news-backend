const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${ENV}` });


if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.ssl = { rejectUnauthorized: false };
  config.max = 2;
} else {
  config.user = process.env.PGUSER;
  config.password = process.env.PGPASSWORD;
  config.host = process.env.PGHOST;
  config.database = process.env.PGDATABASE;
  config.port = process.env.PGPORT;
}

const db = new Pool(config);

module.exports = db;