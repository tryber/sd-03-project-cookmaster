const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let dbSession;
const connection = () => {
  if (dbSession) return Promise.resolve(dbSession);
  return mysqlx.getSession({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.HOSTNAME,
    port: 33060,
    schema: 'cookmaster',
  })
  .then((session) => {
    dbSession = session.getSchema('cookmaster');
    return dbSession;
  })
  .catch((err) => {
    console.error(err);
    // process.exit(1);
  });
};

module.exports = connection;
