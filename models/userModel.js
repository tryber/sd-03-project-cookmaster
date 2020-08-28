const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

const create = async (email, password, firstName, lastName) => {
  connection().then((data) =>
    data
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute()
    );
}

const valiDate = (email, pass1, pass2, firstName, lastName) => {
  switch (true) {
    case !(/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email):
      // RegEx obtido em regexr.com
      return 'O email deve ter o formato email@mail.com';
    case pass1 != pass2:
      return 'As senhas tem que ser iguais';
    case pass1.length < 6:
      return 'A senha deve ter pelo menos 6 caracteres';
    case firstName.length < 3:
      return 'O primeiro nome deve ter pelo menos 3 caracteres';
    case lastName.length < 3:
      return 'O segundo nome deve ter pelo menos 3 caracteres';
    default:
      return true;
  }
}

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
      .execute(),
  )
  .then((results) => results.fetchAll()[0]) // O primeiro do único resultado
  .then(([id, email, password, first_name, last_name]) => (
    { id,
      email,
      password,
      firstName: first_name,
      lastName: last_name })); // Array para objeto via destructuring
  if (!userData) return null;
  else return userData;
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
      .where('id = :id')
      .bind('id', id)
      .execute(),
  )
  .then((results) => results.fetchAll()[0]) // O primeiro do único resultado
  .then(([id, email, password, first_name, last_name]) => (
    { id,
      email,
      password,
      firstName: first_name,
      lastName: last_name })); // Array para objeto via destructuring
  if (!userData) return null;
  else return userData;
};

module.exports = {
  create,
  valiDate,
  findByEmail,
  findById,
};
