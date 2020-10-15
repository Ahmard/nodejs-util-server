const mysql = require("mysql");
const config = require("../config/config");

module.exports = mysql.createPool({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.NAME
});