const mysqlx = require('@mysql/xdevapi');
require('config/config')

const connection = () => (
  mysqlx.getSession({
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: HOSTNAME,
    port: 33060,
    schema: 'cookmaster',
  })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    })
);

const connectionSession = (query) =>
  connection()
    .then((session) => session.sql(query));

module.exports = {
  connection,
  connectionSession,
};
