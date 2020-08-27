const mysqlx = require('@mysql/xdevapi');

const connection = () => {
  return mysqlx.getSession({
    user: 'system',
    password: 'cl',
    host: 'localhost',
    port: 3306,
    schema: 'cookmaster',
  })
  .then((session) => {
    return session.getSchema('cookmaster');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

module.exports = connection;