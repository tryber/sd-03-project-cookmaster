const connect = require('../models/connect');

const setUser = async (userValues) =>
  connect()
    .then((db) => db.getTable('users').insert(
      ['email', 'password', 'first_name', 'last_name'])
      .values(userValues.email, userValues.password, userValues.name, userValues.lastName)
      .execute());

const findByEmail = async (email) =>
  connect()
    .then((db) => 
      db
        .getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
      )
      .then((results) => results.fetchAll()[0])
      .then(([id, email, password, firstName, lastName] = []) => (
        email
          ?
          { id, email, password, firstName, lastName }
          :
        null));

const findById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
      )
      .then((results) => results.fetchAll()[0])
      .then(([id, email, password, firstName, lastName] = []) => (
        id
          ?
          { id, email, password, firstName, lastName }
          :
        null));

module.exports = {
  findByEmail,
  findById,
  setUser,
};
