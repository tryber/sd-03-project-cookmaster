const mysqlx = require('@mysql/xdevapi');

let connect;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

module.exports = async () => {
  if (connect) return Promise.resolve(connect);
  try {
    const session = await mysqlx.getSession(config);
    connect = await session.getSchema('cookmaster');
    return connect;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};
