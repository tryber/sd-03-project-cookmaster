const connect = require('./connect');
/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) =>
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'first_name', 'last_name', 'password'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, firstName, lastName, password]) => (
      firstName
      ?
      {
        id,
        firstName,
        lastName,
        password,
      }
      :
      null
    ));

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) =>
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['first_name', 'last_name', 'password'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([firstName, lastName, password]) => (
      firstName
      ?
      {
        id,
        firstName,
        lastName,
        password,
      }
      :
      null
    ));

// findByEmail('bruno.batista@gmail.com').then(result => console.log(result));
// findById(1).then(result => console.log(result));
// connect().then((session) => console.log('conectado!'));

module.exports = {
  findByEmail,
  findById,
};
