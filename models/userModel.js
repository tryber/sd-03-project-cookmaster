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

const update = async (userId, { email, password, firstName, lastName }) => {
  connection().then((data) =>
    data
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', userId)
      .execute(),
    );
};

const valiDate = (email, pass1, pass2, firstName, lastName) => {
  switch (true) {
    case !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email):
      // RegEx obtido em regexr.com
      return 'O email deve ter o formato email@mail.com';
    case pass1.length < 6:
      return 'A senha deve ter pelo menos 6 caracteres';
    case pass1 !== pass2:
      return 'As senhas tem que ser iguais';
    case firstName.length < 3:
      return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
    case lastName.length < 3:
      return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
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
  update,
  valiDate,
  findByEmail,
  findById,
};
