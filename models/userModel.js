const connect = require('./connect');

const findByEmail = async (email) => {
  const db = await connect();

  const results = await db
    .getTable('users')
    .select(['id', 'first_name', 'last_name', 'password'])
    .where('email = :email')
    .bind('email', email)
    .execute();

    const [id, firstName, lastName, password] = await results.fetchOne();

    return firstName ? { id, firstName, lastName, password } : null;
};

const findById = async (id) => {
  const db = await connect();

  const results = await db
    .getTable('users')
    .select(['first_name', 'last_name', 'password'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const [firstName, lastName, password] = await results.fetchOne();

  return firstName ? { id, firstName, lastName, password } : null;
};

module.exports = {
  findByEmail,
  findById,
};
