const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

// https://github.com/tryber/sd-03-live-lectures/blob/catch-up/express-mvc/models/connect.js

let schema;

module.exports = () => (
  schema
    ? Promise.resolve(schema)
    : mysqlx
      .getSession(config)
      .then(async (session) => {
        return schema = await session.getSchema('cookmaster')
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      })
);
