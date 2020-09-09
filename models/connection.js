const mysqlx = require('@mysql/xdevapi');
// const connect = require('../../B28-Store-Manager/model/connect');
require('dotenv').config();

let connection;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

// Cria uma nova sessão automaticamente
module.exports = async () => {
  if (connection) return Promise.resolve(connection);
  return mysqlx.getSession(config)
  .then((session) => {
    connection = session.getSchema('cookmaster');
    return connection;
    }
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
};
