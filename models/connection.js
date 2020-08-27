// Ref.: https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/
require('dotenv/config');
// Fim da Ref.
const mysqlx = require('@mysql/xdevapi');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

// Ref.: https://github.com/tryber/sd-03-live-lectures/blob/catch-up/express-mvc/models/connect.js
let schema;

module.exports = () => {
  return schema ?
  Promise.resolve(schema)
  : mysqlx
    .getSession(config)
    .then(async (session) => {
      schema = await session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
  };
// Fim da Ref.
