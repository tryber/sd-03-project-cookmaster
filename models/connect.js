const mysqlx = require('@mysql/xdevapi');

require('dotenv/config');

let schema;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const connect = async () => {
  if (schema) return Promise.resolve(schema);
  try {
    const session = await mysqlx.getSession(config);
    schema = await session.getSchema('cookmaster');
    return schema;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
module.exports = connect;
