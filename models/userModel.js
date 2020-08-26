const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se enscontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const db = await connection();
  const users = await db.getTable('users');
  const user = await users.select().where('email = :email')
    .bind('email', email).execute();

  return user.fetchOne();
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => id;

module.exports = {
  findByEmail,
  findById,
};
