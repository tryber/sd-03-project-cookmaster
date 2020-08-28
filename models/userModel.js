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
const findByEmail = async (param) => {
  const getEmail = await connection();
  const userEmailData = await getEmail
    .getTable('users')
    .select(['id', 'email', 'password'])
    .where('email = :email')
    .bind('email', param)
    .execute()
    .then((results) => results.fetchAll())
    .then((emails) => emails[0]);

  if (!userEmailData) return null;

  const [id, email, password] = userEmailData;

  return { id, email, password };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => {
  const getId = await connection();
  const userIdData = await getId
    .getTable('users')
    .select('id')
    .where('id = :id')
    .bind('id', userId)
    .execute();
  const result = await userIdData.fetchAll();
  const userIdParams = await result[0];

  return userIdParams;
};

const isValid = (email, password, firstName, lastName) => {
  if (!email || !password || !firstName || !lastName) return false;
  if (typeof email !== 'string' || typeof password !== 'string'
    || typeof firstName !== 'string' || typeof lastName !== 'string') return false;
  return true;
};

const insertUser = async (email, password, firstName, lastName) => {
  const db = await getSchema();
  await db.getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  isValid,
  insertUser
};
