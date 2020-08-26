const mysqlx = require('@mysql/xdevapi');

const connection = () => (
  mysqlx.getSession({
    user: 'root',
    password: 'password',
    host: 'localhost',
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
