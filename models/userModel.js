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

  const [id, email, password, name, lastName] = userEmailData;

  return { id, email, password, name, lastName };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (ids) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', ids)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, email, password, name, lastName]) => ({
      id,
      email,
      password,
      name,
      lastName,
    }));
};

const insertUser = async (email, password, name, lastname) => {
  try {
    const db = await connection();
    return db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastname)
      .execute();
  } catch (err) {
    return process.exit(1);
  }
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
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
