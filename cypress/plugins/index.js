const  my = require('mysql2');
require('dotenv/config');

function queryTestDb(query, config) {
  const connection = my.createConnection({host: process.env.HOSTNAME, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD})
  connection.connect()
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

module.exports = (on, config) => {
    on('task', {
      queryDb: query => {
        return queryTestDb(query, config)
      }
    })
}
