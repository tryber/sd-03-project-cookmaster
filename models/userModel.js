const connect = require('./connection');

const findByEmail = async (uEmail) => connect()
  .then((db) => db.getTable('users')
    .select(['id', 'first_name', 'last_name', 'password', 'email'])
    .where('email = :email')
    .bind('email', uEmail)
    .execute(),
  )
  .then((fetch) => fetch.fetchOne())
  .then(([id, firstName, lastName, password, email]) => ({
    id, email, password, name: firstName, lastName,
  }))
  .catch((err) => err);

const findById = async (uId) => connect()
  .then((db) => db.getTable('users')
    .select(['id', 'first_name', 'last_name', 'password', 'email'])
    .where('id = :id')
    .bind('id', uId)
    .execute(),
  )
  .then((fetch) => fetch.fetchOne())
  .then(([id, firstName, lastName, password, email]) => ({
    id, name: firstName, lastName, password, email,
  }));

const upadateUser = async (id, email, password, firstName, lastName) => {
  const db = await connect();

  await db
    .getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', firstName)
    .set('last_name', lastName)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  upadateUser,
};
