const mysqlx = require('@mysql/xdevapi');

let schema;

module.exports = () => schema
  ? Promise.resolve(schema)
  : mysqlx
    .getSession({
      host: process.env.HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: 33060,
    })
    .then(async (session) => {
      schema = await session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
