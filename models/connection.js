const mysqlx = require('@mysql/xdevapi');

let schema;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = () => {
  return schema
    ? Promise.resolve(schema)
    : mysqlx
        .getSession(config)
        .then(async (session) => {
          schema = await session.getSchema('cookmaster');
          return schema;
        })
        .catch((error) => {
          console.error(error);
        });
};
