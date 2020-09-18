const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (Email) => {
  return connection()
  .then((db) => db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', Email)
    .execute(),
  )
  .then((results) => results.fetchAll()[0])
  .then(
    ([id, email, password, firstName, lastName]) =>
    ({ id, email, password, firstName, lastName }),
  )
  .catch((err) => console.error(err));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection()
  .then((db) => db
    .getTable('users')
    .select()
    .where('id = :id')
    .bind('id', id)
    .execute(),
  )
  .then((results) => results.fetchAll()[0])
  .then(
    ([id, email, password, firstName, lastName]) =>
    ({ id, email, password, firstName, lastName }),
  )
  .catch((err) => console.error(err));
};

const addUser = (email, password, name, lastName) => {
  return connection()
    .then((db) =>
      db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute(),
    );
};

const updateUser = (id, email, password, firstName, lastName) =>
  connection()
    .then((db) =>
      db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute(),
    );

module.exports = {
  findByEmail,
  findById,
  addUser,
  updateUser,
};
