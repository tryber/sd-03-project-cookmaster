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
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', userId)
    .execute();
  const result = await userIdData.fetchAll();
  const userIdParams = await result[0];

  return userIdParams;
};

const insertUser = async (email, password, name, lastname) => {
  try {
    const db = await connection();
    return db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastname)
      .execute();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

// const validatePassword = (password) => (password.length >= 6 ? true : false);

const validateFullName = (name, lastname) => {
  if (typeof name !== 'string' || typeof lastname !== 'string') return false;
  return true;
};

const userSignUp = async (email, password, name, lastname) => {
  const generalData = await connection();
  await generalData
    .getTable('users')
    .insert(['email', 'password', 'name', 'lastname'])
    .values(email, password, name, lastname)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  validateEmail,
  // validatePassword,
  validateFullName,
  userSignUp,
  insertUser,
};
