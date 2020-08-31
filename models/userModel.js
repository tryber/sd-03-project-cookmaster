const db = require('./DbConnection');
/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const usuarios = await db()
  .then((data) => data.getTable('users')
  .select()
  .where('email = :email')
  .bind('email', email)
  .execute());

  const user = usuarios.fetchAll();
  return user.map(([id, email2, password, name, lastName]) => (
  { id, email2, password, name, lastName }
))[0];
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const usuarios = await db()
  .then((data) => data.getTable('users')
  .select()
  .where('id = :id')
  .bind('id', id)
  .execute());
  const user = usuarios.fetchAll();
  return user.map(([id2, email, password, name, lastName]) => (
  { id2, email, password, name, lastName }
))[0];
};


const createuser = async (email, password, firstname, lastname) => {
  db().then((data) => data.getTable('users')
  .insert(['email', 'password', 'first_name', 'last_name'])
  .values(email, password, firstname, lastname)
  .execute());
};

const editUser = async (id, email, password, name, lastName) =>
  db().then((db2) =>
    db2
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', name)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute()
      .catch((error) => error)
  );

module.exports = {
  findByEmail,
  findById,
  createUser: createuser,
  editUser,
};
