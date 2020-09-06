const connect = require('./connect');

const findByEmail = async (email) => (
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) =>
      results.fetchOne(),
    )
    .then(([id, email, password, firstName, lastName]) => (
      {
        id,
        email,
        password,
        name: firstName,
        lastName,
      }
    ))
);

const findById = async (id) => (
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) =>
      results.fetchOne(),
    )
    .then(([id, email, password, firstName, lastName]) => (
      {
        id,
        email,
        password,
        name: firstName,
        lastName,
      }
    ))
);

module.exports = {
  findByEmail,
  findById,
};
