const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (userEmail) => {
  try {
    const db = await connection();
    const searchQuery = await db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('email', userEmail)
      .execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.reduce((acc, [id, email, password, name, lastName]) => ({
        ...acc,
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
const findById = async (userId) => {
  try {
    const db = await connection();
    const searchQuery = await db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :id')
      .bind('id', userId)
      .execute();
    const results = await searchQuery.fetchAll();
    return results
      ? results.reduce((acc, [id, email, password, name, lastName]) => ({
        ...acc,
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
};
