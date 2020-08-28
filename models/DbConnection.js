const mysqlx = require('@mysql/xdevapi');

const connection = () => (
  mysqlx.getSession({
    user: 'clayton',
    password: 'cl172615',
    host: 'localhost',
    port: 33060,
    schema: 'cookmaster',
  })
  .then((session) => (
        session.getSchema('cookmaster')
  ))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
);

module.exports = connection;
