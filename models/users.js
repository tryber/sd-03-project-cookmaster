const connect = require('./connection');

connect().then(() => console.log('conectado!'));

const findUserByEmail = async (email) => {
  const db = await connect();

  const results = await db
    .getTable('users')
    .select(['id', 'first_name', 'last_name', 'password'])
    .where('email = :email')
    .bind('email', email)
    .execute();

  const user = results.fetchAll()[0];

  return user.firstName
    ? { id: user.id, firstName: first_name, lastName: last_name, password: user.password }
    : null;
};

const findUserById = async (id) => {
  const db = await connect();

  const results = await db
  .getTable('users')
  .select(['id', 'first_name', 'last_name', 'password'])
  .where('id = :id')
  .bind('id', id)
  .execute()

  const user = results.fetchAll()[0];

  return user.firstName
  ? { id: user.id, firstName: first_name, lastName: last_name, password: user.password }
  : null;
}

module.exports = {
  findUserByEmail,
  findUserById,
};
