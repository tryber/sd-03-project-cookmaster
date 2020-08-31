const mysqlx = require('@mysql/xdevapi');
let db_session;
const connection = () => {
  if (db_session) return Promise.resolve(db_session) 
  return mysqlx.getSession({
    user: 'root',
    password: '',
    host: 'localhost',
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
