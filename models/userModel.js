const connect = require('../models/connect');

const setUser = async (userValues) =>
  connect()
    .then((db) => db.getTable('users').insert(
      ['email', 'password', 'first_name', 'last_name'])
      .values(userValues.email, userValues.password, userValues.name, userValues.lastName)
      .execute());

const findByValue = async (value, param) =>
  connect()
    .then((db) =>
      db
        .getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where(`${param} = :email`)
        .bind('email', value)
        .execute(),
      )
      .then((results) => results.fetchAll()[0])
      .then(([id, email, password, firstName, lastName] = []) => (
        lastName
          ?
          { id, email, password, firstName, lastName }
          :
        null));

module.exports = {
  findByValue,
  setUser,
};
