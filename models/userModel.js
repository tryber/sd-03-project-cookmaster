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

module.exports = {
  findByEmail,
  findById,
};
