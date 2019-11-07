require('dotenv').config();

module.exports = {
  "migrationDirectory": "src/migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV)
    ? process.env.TEST_DB_URL
    : process.env.DB_URL
}