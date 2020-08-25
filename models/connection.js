const msqlx = require('@mysql/xdevapi');
require('dotenv').config();

let connect;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const connection = async () => {
  connect ? Promise.resolve(connect) : await msqlx.getSession(config)
    .then((session) => {
      connect = session.getSchema('cookmaster')
      return connect;
    }).catch((err) => console.error(err), process.exit(1))
};

module.exports = connection;
