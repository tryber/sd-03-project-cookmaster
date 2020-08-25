require('dotenv/config');

//https://github.com/tryber/sd-03-live-lectures/blob/catch-up/express-mvc/models/connect.js

const mysqlx = require('@mysql/xdevapi');

let schema;

module.exports = () => schema
  ? Promise.resolve(schema)
  : mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD, 
      host: process.env.HOSTNAME, 
      port: 33060
    })
    .then(async (session) => {
      schema = await session.getSchema('cookmaster');
      return schema;
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });