const { connect } = require('../connect');

const findById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([userId, email, password, name, lastName]) => ({
      id: userId,
      email,
      password,
      name,
      lastName,
    }));

module.exports = findById;
