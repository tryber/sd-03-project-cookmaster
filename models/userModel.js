const connection = require('./connection');

const findByEmail = async (email) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('email', email)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then(([id, userEmail, password, name, lastName]) => ({
      id,
      userEmail,
      password,
      name,
      lastName,
    }))
);

const findById = async (id) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchAll())
    .then(([userId, email, password, name, lastName]) => ({
      id: userId,
      email,
      password,
      name,
      lastName,
    }))
);

module.exports = {
  findByEmail,
  findById,
};
