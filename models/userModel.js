/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'Taylor',
  lastName: 'Doe',
};

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */
const connect = require('./connection');
/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => connect()
  .then((db) => db.getTable('users')
    .select(['id', 'first_name', 'last_name', 'password', 'email'])
    .where('email = :email')
    .bind('email', email)
    .execute()
  )
  .then((fetch) => fetch.fetchOne())
  .then(([id, firstName, lastName, password, email]) => ({ id, email, password, name: firstName, lastName }))
  .catch((err) => console.log(err));

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => connect()
  .then((db) => db.getTable('users')
    .select(['id', 'first_name', 'last_name', 'password', 'email'])
    .where('id = :id')
    .bind('id', id)
    .execute()
  )
  .then((fetch) => fetch.fetchOne())
  .then(([id, firstName, lastName, password, email]) => ({ id, name: firstName, lastName, password, email }));

const upadateUser = async (id, email, password, first_name, last_name) => {
  const db = await connect();

  await db
    .getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', first_name)
    .set('last_name', last_name)
    .where('id = :id')
    .bind('id', id)
    .execute()

}

module.exports = {
  findByEmail,
  findById,
  upadateUser,
};
