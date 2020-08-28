/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

const connection = require('./connection');
/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
// const findByEmail = async (email) => {

//   return TEMP_USER;
// };

const objectDestructure = ({id, email, password, ...object}) => {
  return { id, email,  password, name: object.first_name,  lastName: object.last_name };
}

const findByEmail = async (email) =>
  connection()
    .then((db) => db.getTable('users').select().execute())
    .then((users) => users.objects.filter((user) => user.email === email))
    .then((user) => objectDestructure(user[0]));



/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
// const findById = async (id) => {
//   return TEMP_USER;
// };

const findById = async (id) =>
  connection()
    .then((db) => db.getTable('users').select().execute())
    .then((users) => users.objects.filter((user) => user.id === id))
    .then((user) => objectDestructure(user[0]));

module.exports = {
  findByEmail,
  findById,
};
