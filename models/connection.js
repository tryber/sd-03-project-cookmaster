const mysqlx = require('@mysql/xdevapi');

let schema;

async function connection() {
  if (schema) Promise.resolve(schema);
  try {
    return mysqlx
    .getSession({
      host: process.env.HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: 33060,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function connectionDB(db) {
  if (schema) Promise.resolve(schema);
  try {
    const conn = await connection();
    return conn.getSchema(db);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = {
  connection,
  connectionDB,
};
