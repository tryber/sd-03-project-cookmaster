const connect = require('./connect');

const findByEmail = async (email) => {
  try {
    const db = await connect();
    const searchDb = await db
      .getTable('users')
      .select(['id', 'email', 'password'])
      .where('email = :email')
      .bind('email', email)
      .execute();
    const [ [id, mail, password] ] = await searchDb.fetchAll();
    return mail ? { id, email: mail, password } : null;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (uid) => {
  try {
    const db = await connect();
    const searchDb = await db
      .getTable('users')
      .select()
      .where('id = :id')
      .bind('id', uid)
      .execute();
    const [ [ id, email, password, name, lastName] ] = await searchDb.fetchAll();

    return { id, email, password, name, lastName };
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const registerUser = async (email, password, name, lastname) => {
  try {
    const db = await connect();
    return db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastname)
      .execute();
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'bruno.batista@gmail.com',
//   password: '12345678',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

// const registerUser = async (email, password, name, lastName) =>
//   connect().then((db) => db.getTable('users'));

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

module.exports = {
  findByEmail,
  findById,
  registerUser,
};
