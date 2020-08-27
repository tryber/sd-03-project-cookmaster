require('dotenv').config();
const msqlx = require('@mysql/xdevapi');

let connect;

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

const connection = () => {
  return connect
    ? Promise.resolve(connect)
    : msqlx.getSession(config)
      .then(async (session) => {
        connect = await session.getSchema('cookmaster');
        return connect;
      }).catch((err) => console.error(err) && process.exit(1));
};

module.exports = connection;

// // module.exports = async () => {
// //   if (connect) return Promise.resolve(connect);
// //   try {
// //     const session = await msqlx.getSession(config);
// //     connect = await session.getSchema('cookmaster');
// //     return connect;
// //   } catch (error) {
// //     console.error(error);
// //     return process.exit(1);
// //   }
// // };

// const mysqlx = require('@mysql/xdevapi');
// let schema;
// const config = {
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   host: process.env.HOSTNAME,
//   port: 33060,
//   socketPath: '/var/run/mysqld/mysqld.sock',
// };
// module.exports = () => {
//   return schema
//     ? Promise.resolve(schema)
//     : mysqlx
//       .getSession(config)
//       .then(async (session) => {
//         schema = await session.getSchema('cookmaster');
//         return schema;
//       })
//       .catch((error) => {
//         console.error(error);
//       });
// };
