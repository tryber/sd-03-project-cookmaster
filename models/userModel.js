/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */


/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const connect = require('../models/connect');

const setUser = async (userValues) =>
  connect()
    .then((db) => db.getTable('users').insert(
      ['email', 'password', 'first_name', 'last_name'])
      .values(userValues.email, userValues.password, userValues.name, userValues.lastName)
      .execute());

const changeUser = async ({ email, password, name, lastName }, id) =>
connect()
  .then((db) => db.getTable('users')
  .update()
  .set('email', email)
  .set('password', password)
  .set('first_name', name)
  .set('last_name', lastName)
  .where('id = :id')
  .bind('id', id)
  .execute());

const findByValue = async (value, param) =>
  connect()
    .then((db) =>
      db
        .getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where(`${param} = :email`)
        .bind('email', value)
        .execute(),
      )
      .then((results) => results.fetchAll()[0])
      .then(([id, email, password, firstName, lastName] = []) => (
        lastName
          ?
          { id, email, password, firstName, lastName }
          :
        null));

module.exports = {
  findByValue,
  setUser,
  changeUser,
};
