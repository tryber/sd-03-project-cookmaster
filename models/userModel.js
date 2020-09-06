const connection = require('./connection');

const create = async (email, password, firstName, lastName) => {
  connection().then((data) =>
    data
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute(),
    );
};

const valiDate = (email, pass1, pass2, firstName, lastName) => {
  switch (true) {
    case !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email):
      // RegEx obtido em regexr.com
      return 'O email deve ter o formato email@mail.com';
    case pass1 !== pass2:
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
};

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} uEmail Email do usuário a ser encontrado
 */
const findByEmail = async (uEmail) => {
  const userData = await connection()
    .then((data) => data
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('email', uEmail)
      .execute(),
  )
  .then((results) => results.fetchAll()[0] || [])
  .then(([id, email, password, firstName, lastName]) => (
    { id,
      email,
      password,
      firstName,
      lastName })); // Array para objeto via destructuring
  if (!userData) return null;
  return userData;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} uid ID do usuário
 */
const findById = async (uid) => {
  const userData = await connection()
    .then((data) => data
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :id')
      .bind('id', uid)
      .execute(),
  )
  .then((results) => results.fetchAll()[0])
  .then(([id, email, password, firstName, lastName]) => (
    { id,
      email,
      password,
      firstName,
      lastName })); // Array para objeto via destructuring
  if (!userData) return null;
  return userData;
};

module.exports = {
  create,
  valiDate,
  findByEmail,
  findById,
};
