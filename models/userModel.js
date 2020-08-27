const connection = require('./connection');

const findByEmail = async (EMAIL) => {
  const db = await connection();

  const results = await db.getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', EMAIL)
    .execute();

  const resulSearch = results.fetchAll();

  return resulSearch ? resulSearch.map(([id, email, password, names, lastName]) => ({
    id,
    email,
    password,
    names,
    lastName,
  }))[0] : null;
};

const findById = async (ID) => {
  const db = await connection();
  
  const results = await db.getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', ID)
    .execute();

  const resulSearch = results.fetchAll();

  return resulSearch ? resulSearch.map(([id, email, password, name, lastName]) => ({
    id,
    email,
    password,
    name,
    lastName,
  }))[0] : null;
};

module.exports = {
  findByEmail,
  findById,
};

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

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
