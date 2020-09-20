const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '123123',
  database: 'cookmaster',
});

module.exports = {
  connection,
};
