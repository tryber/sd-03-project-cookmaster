/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

const connection = require('./connection');
/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

const findByEmail = async (inputEmail) =>
  connection()
    .then((db) => db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :inputEmail')
      .bind('inputEmail', inputEmail)
      .execute())
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => (
    { id, email, password, name, lastName }));

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */

const findById = async (inputId) =>
  connection()
    .then((db) => db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :inputId')
      .bind('inputId', inputId)
      .execute())
    .then((result) => result.fetchOne())
    .then(([id, email, password, name, lastName]) => (
      { id, email, password, name, lastName }
    ));

module.exports = {
  findByEmail,
  findById,
};
