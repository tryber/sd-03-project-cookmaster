const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let db_session;
const connection = () => {
  if (db_session) return Promise.resolve(db_session) 
  return mysqlx.getSession({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.HOSTNAME,
    port: 33060,
    schema: 'cookmaster',
  })
  .then((session) => {
      db_session = session.getSchema('cookmaster')
      return db_session;
  })
  .catch((err) => {
    console.error(err);
    // process.exit(1);
  })
};

module.exports = connection;
