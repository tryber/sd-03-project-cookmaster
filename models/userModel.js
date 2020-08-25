const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
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
    .then((result) => result.fetchAll()[0])
    .then(([id, email, password, first_name, last_name]) => ({
      id,
      email,
      password,
      name: first_name,
      lastName: last_name,
    }));

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
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
    .then((result) => result.fetchAll()[0])
    .then((id, email, password, first_name, last_name) => ({
      id,
      email,
      password,
      name: first_name,
      lastName: last_name,
    }));

module.exports = {
  findByEmail,
  findById,
};
