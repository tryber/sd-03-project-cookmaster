/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

const connect = require('./connect');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailS) => (
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', emailS)
        .execute(),
    )
    .then((results) =>
      results.fetchOne(),
    )
    .then(([id, email, password, firstName, lastName]) => (
      {
        id,
        email,
        password,
        name: firstName,
        lastName: lastName,
      }
    ))
);

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idS) => (
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', idS)
        .execute()
    )
    .then((results) =>
      results.fetchOne()
    )
    .then(([id, email, password, first_name, last_name]) => (
      {
        id,
        email,
        password,
        name: first_name,
        lastName: last_name,
      }
    ))
);

module.exports = {
  findByEmail,
  findById,
};
