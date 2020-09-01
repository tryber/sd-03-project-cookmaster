const connection = require('./connection');

const findByEmail = async (email) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, userEmail, password, firstName, lastName]) => ({
      id,
      email: userEmail,
      password,
      name: firstName,
      lastName,
    }));

const findById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([userId, email, password, firstName, lastName]) => ({
      id: userId,
      email,
      password,
      name: firstName,
      lastName,
    }));

const createUser = async({ email, password, name, lastName }) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute()
  );

module.exports = {
  findByEmail,
  findById,
  createUser,
};
