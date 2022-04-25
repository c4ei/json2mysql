const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "shop2204",
  password: "gkgk^^12",
  database: "shop"
});

module.exports = connection