require('dotenv').config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
  DB_DIALECT
} = process.env;

// Configuring the database
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_DIALECT,
    logging: false
  },
  test: {
    username: "root",
    password: '',
    database: "gomo_db2",
    host: "localhost",
    port: 3306,
    dialect: "mariadb",
    logging: false
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  }
}