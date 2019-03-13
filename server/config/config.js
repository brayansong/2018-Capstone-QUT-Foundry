require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "dev",
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "testing",
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "production",
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres"
  }
};
