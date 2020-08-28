const connect = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

const insertValidation = (email, password, confirmPassword, name, lastName) => {
  if (!email || !password || !name || !lastName) return false;
  if (confirmPassword !== password) return false;

  return true;
};

const insertUser = async (email, password, name, lastName) => {
  try {
    const db = await connect();
    const query = await db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute();

    return query;
  } catch (error) {
    return error;
  }
};

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emailInput) => {
  try {
    const db = await connect();
    const query = await db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('email', emailInput)
      .execute();
    const results = await query.fetchAll();
    return results
      ? results.reduce((acumulator, [id, email, password, name, lastName]) => ({
        ...acumulator,
        id,
        email,
        password,
        name,
        lastName,
      }), {})
      : null;
  } catch (error) {
    return error;
  }
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idInput) => {
  try {
    const db = await connect();
    const query = await db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :id')
      .bind('id', idInput)
      .execute();
    const results = await query.fetchAll();
    return results
      ? results.reduce((acumulator, [id, email, password, name, lastName]) => ({
        ...acumulator,
        id,
        email,
        password,
        name,
        lastName,
      }), {})
      : null;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByEmail,
  findById,
  insertUser,
  insertValidation,
};
