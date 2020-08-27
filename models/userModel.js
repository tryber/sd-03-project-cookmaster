const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const db = await connection();
  const sharchUser = await db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', email)
    .execute();

  const response = sharchUser.fetchAll();
  return response
    ? response.reduce((acc, [id, email, password, name, lastName]) => ({
        ...acc,
        id,
        email,
        password,
        name,
        lastName,
      }), {})
    : null;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const db = await connection();
  const sharchUser = await db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const response = sharchUser.fetchAll();

  return response
    ? response.reduce((acc, [id, email, password, name, lastName]) => ({
        ...acc,
        id,
        email,
        password,
        name,
        lastName,
      }), {})
    : null;
};

module.exports = {
  findByEmail,
  findById,
};
