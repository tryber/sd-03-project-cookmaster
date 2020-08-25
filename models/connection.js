const mysqlx = require('@mysql/xdevapi');

let schema;

async function connection() {
  if (schema) return Promise.resolve(schema);
  try {
    schema = mysqlx
    .getSession({
      host: process.env.HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: 33060,
    });
    return schema;
  } catch (err) {
    process.exit(1);
  }
}

async function connectionDB(db) {
  if (schema) return Promise.resolve(schema);
  try {
    const conn = await connection();
    return conn.getSchema(db);
  } catch (err) {
    process.exit(1);
  }
}

module.exports = {
  connection,
  connectionDB,
};
