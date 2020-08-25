const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

let connect;

module.exports = () => {
  if (connect) return Promise.resolve(connect);
  try {
const session = await mysqlx.getSession({

})
  } catch (error) {

  }
}
