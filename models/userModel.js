const connect = require('./connect');

const findByEmail = async (emailS) => (
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :emailS')
        .bind('email', emailS)
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
        lastName: lastName,
      }
    ))
);

const findById = async (idS) => (
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :idS')
        .bind('id', idS)
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
