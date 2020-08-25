require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

// https://course.betrybe.com/back-end/architecture/mvc/part-1#mvc-com-express
const connection = () => {
  return mysqlx.getSession({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    host: process.env.HOSTNAME, 
    port: 33060,
    schema: 'cookmaster',
  })
  .then(async (session) => {
    let schema;
    schema = await session.getSchema('cookmaster');
    return schema;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

module.exports = connection;
