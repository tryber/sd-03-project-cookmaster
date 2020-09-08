require('dotenv/config');

const mysqlx = require('@mysql/xdevapi');

let schema = null;

const connect = async () => (schema
  ? Promise.resolve(schema)
  : mysqlx.getSession({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.HOSTNAME,
    port: 33060,
    schema: 'cookmaster',
    socketPath: '/var/run/mysql/mysqld.sock',
  }).then((session) => {
    schema = schema || session.getSchema(process.env.DB_SCHEMA);
    return schema;
  }));

module.exports = connect;
