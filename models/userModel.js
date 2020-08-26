const connection = require('./connection');

const findByEmail = async (email) => {
  const db = await connection();

  const results = db.getTable('users')
    .select('email')
    .where('email = :email')
    .bind('email', email)
    .execute();

  const resulSearch = results.fetchAll();

  if (!resulSearch) return null;

  resulSearch.map(([id, email, password]) => ({
    id,
    email,
    password,
  }));
};

const findById = async (idf) => {
  const db = await connection();

  const results = await db.getTable('users')
    .select('id')
    .where('id = :id')
    .bind('id', idf)
    .execute();

  const resulSearch = results.fetchAll();

  if (!resulSearch) return null;

  const [email, password, id] = resulSearch;
  return { email, password, id };
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
