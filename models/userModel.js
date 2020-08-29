const  db  = require('./DbConnection');
/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'teste',
  lastName: 'Doe',
};

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const usuarios = await  db()
  .then((data) => data.getTable('users')
  .select()
  .where('email = :email')
  .bind('email', email)
  .execute())

const user = usuarios.fetchAll();
return user.map(([id,email, password, name, lastName]) => (
  { id, email, password, name, lastName }
))[0];
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const usuarios = await  db()
  .then((data) => data.getTable('users')
  .select()
  .where('id = :id')
  .bind('id', id)
  .execute())
  const user = usuarios.fetchAll();
return user.map(([id,email, password, name, lastName]) => (
  { id, email, password, name, lastName }
))[0];
};

module.exports = {
  findByEmail,
  findById,
};
