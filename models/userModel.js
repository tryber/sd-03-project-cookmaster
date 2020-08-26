const { connectionDB } = require('./connection');
/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
async function usersTable() {
  const users = await connectionDB('cookmaster');
  return users.getTable('users');
}

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
const findByEmail = async (email) => {
  const table = await usersTable();
  const users = await table
    .select()
    .where('email = :email')
    .bind('email', email)
    .execute();

  const user = users.fetchAll();
  return user.map(([,, password, name, lastName]) => (
    { id, email, password, name, lastName }
  ))[0];
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const table = await usersTable();
  const users = await table
    .select()
    .where('id = :id')
    .bind('id', id)
    .execute();

  const user = users.fetchAll();
  return user.map(([id, email, password, name, lastName]) => (
    { id, email, password, name, lastName }
  ))[0];
};

async function registerUser(email, password, firstName, lastName) {
  const db = await connectionDB('cookmaster');
  const table = db.getTable('users');
  await table
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
}

module.exports = {
  findByEmail,
  findById,
  registerUser,
};
