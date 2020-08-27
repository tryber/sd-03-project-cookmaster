const mysqlx = require('@mysql/xdevapi');

let schema;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = async () => {
  if (schema) return Promise.resolve(schema);
  const session = await mysqlx.getSession(config);
  schema = session.getSchema('cookmaster');

  return schema;
};
