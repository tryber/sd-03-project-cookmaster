const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

// Cria uma nova sessão automaticamente
const connection = async () => {
  return mysqlx.getSession(config)
  .then((session) => {
    return session.getSchema('cookmaster');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

module.exports = connection;
