const connect = require('./connection');

const findByEmail = async (email) => connect()
  .then((db) => db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', email)
    .execute())
  .then((res) => res.fetchAll()[0])
  .then(([id, userEmail, password, firstName, lastName]) => ({
    id,
    email: userEmail,
    password,
    firstName,
    lastName,
  }));

const findById = async (id) => connect()
  .then((db) => db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((res) => res.fetchAll()[0])
  .then(([userId, email, password, firstName, lastName]) => ({
    id: userId,
    email,
    password,
    firstName,
    lastName,
  }));

const createUser = async (email, password, firstName, lastName) => connect()
  .then((db) => db
    .getTable('users')
    .insert('email', 'password', 'first_name', 'last_name')
    .values(email, password, firstName, lastName)
    .execute());

const editUser = async (id, email, password, firstName, lastName) => connect()
  .then((db) => db
    .getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', firstName)
    .set('last_name', lastName)
    .where('id = :id')
    .bind('id', id)
    .execute());

module.exports = {
  findByEmail,
  findById,
  createUser,
  editUser,
};
