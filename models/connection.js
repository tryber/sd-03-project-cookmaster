const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let schema;
const config = {
  host: process.env.HOSTNAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: 33060,
};

async function connectionDB(db) {
  try {
    if (schema) return Promise.resolve(schema);
    const conn = await mysqlx.getSession(config);
    schema = await conn.getSchema(db);
    return schema;
  } catch (err) {
    process.exit(1);
  }
}

module.exports = {
  connectionDB,
};
