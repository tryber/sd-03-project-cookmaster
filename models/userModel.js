const connect = require('./connection');
/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'Taylor',
  lastName: 'Doe',
};

const getAllRecipes = async () =>
  connect()
    .then((db) => db.getTable('recipes'))
    .select();

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

const registerUser = async (email, password, name, lastName) =>
  connect().then((db) => db.getTable('users'));

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  return TEMP_USER;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return TEMP_USER;
};

module.exports = {
  findByEmail,
  findById,
  getAllRecipes,
};
