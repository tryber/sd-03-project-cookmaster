/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const connect = require('./connection');

const findByEmail = async (email) => connect()
  .then((db) => db
    .getTable('users')
    .select('id', 'email', 'password')
    .where('email = :email')
    .bind('email', email)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, userEmail, password]) => ({
    id,
    userEmail,
    password,
  }))[0]);

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => connect()
  .then((db) => db
    .getTable('users')
    .select('email', 'password', 'first_name', 'last_name')
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([email, password, name, lastName]) => ({
    email,
    password,
    name,
    lastName,
  }))[0]);

module.exports = {
  findByEmail,
  findById,
};
