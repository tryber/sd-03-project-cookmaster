const connect = require('./connect');

const findByEmail = async (email) => {
  const db = await connect();

  const results = await db
    .getTable('users')
    .select(['id', 'first_name', 'last_name', 'password'])
    .where('email = :email')
    .bind('email', email)
    .execute();

  const [ id, first_name, last_name, password ] = await results.fetchOne();

  return first_name
    ? { id, firstName: first_name, lastName: last_name, password }
    : null;
};

const findById = async (id) => {
  const db = await connect();

  const results = await db
    .getTable('users')
    .select(['id', 'first_name', 'last_name', 'password'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const user = results.fetchAll()[0];

  return user.firstName
    ? { id: user.id, firstName: user.first_name, lastName: user.last_name, password: user.password }
    : null;
};

module.exports = {
  findByEmail,
  findById,
};
