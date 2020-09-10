const connection = require("./connection");
/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  return await connection()
    .then((db) =>
      db
        .getTable('users')
        .select()
        .where('email = :email')
        .bind('email', email)
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((user) => {
      if (user.length !== 0) return {
        id: user[0][0],
        email: user[0][1],
        password: user[0][2],
        firstName: user[0][3],
        lastName: user[0][4],
      };
      return null;
    });
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return await connection()
    .then((db) =>
      db
        .getTable('users')
        .select()
        .where('id = :id')
        .bind('id', id)
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((user) => {
      if (user.length !== 0) return {
        id: user[0][0],
        email: user[0][1],
        password: user[0][2],
        firstName: user[0][3],
        lastName: user[0][4],
      };
      return null;
    });
};

module.exports = {
  findByEmail,
  findById,
};
