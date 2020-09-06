require('dotenv/config');
const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const mysqlx = require('@mysql/xdevapi');

let schema;

module.exports = () => schema
  ? Promise.resolve(schema)
  : mysqlx
    .getSession(config)
    .then(async (session) => {
      schema = await session.getSchema('cookmaster');
      return schema;
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });