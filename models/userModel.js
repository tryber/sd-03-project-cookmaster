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
    .then(([id, userEmail, password, firstName, lastName] = []) => (userEmail ? {
      id,
      email: userEmail,
      password,
      name: firstName,
      lastName,
    } : null));

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
    .then(([userId, email, password, firstName, lastName] = []) => (userId ? {
      id: userId,
      email,
      password,
      name: firstName,
      lastName,
    } : null));

const createUser = async ({ email, password, name, lastName }) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute(),
  );

const editUser = async ({ id, email, password, name, lastName }) =>
  connection().then((db) =>
    db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', name)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

module.exports = {
  findByEmail,
  findById,
  createUser,
  editUser,
};
