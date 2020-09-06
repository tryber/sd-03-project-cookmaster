const connect = require('./connection');

const addUser = async (email, password, name, lastName) =>
  connect()
    .then((db) =>
      db
        .getTable('users')
        .insert(['email', 'password', 'first_name', 'last_name'])
        .values(email, password, name, lastName)
        .execute(),
  );

module.exports = {
  addUser,
};
