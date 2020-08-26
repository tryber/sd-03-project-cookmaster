const connection = require("./connection");

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const userData = await connection()
    .then((data) => data
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('email', email)
      .execute()
  )
  .then((results) => results.fetchAll()[0]) // O primeiro do único resultado
  .then(([id, email, password, first_name, last_name]) => 
    ({id, email, password, first_name, last_name})) // Array para objeto via destructuring

  if (!userData) return null;
  console.log(userData);
  return userData;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const userData = await connection()
    .then((data) => data
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('id', id)
      .execute()
  )
  .then((results) => results.fetchAll()[0]) // O primeiro do único resultado
  .then(([id, email, password, first_name, last_name]) => (
    {id,
      email,
      password,
      firstName: first_name,
      lastName: last_name})) // Array para objeto via destructuring

  if (!userData) return null;
  console.log(userData);
  return userData;
};

module.exports = {
  findByEmail,
  findById,
};
