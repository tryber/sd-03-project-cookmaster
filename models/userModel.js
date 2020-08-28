const connection = require('./connection');
const Serializer = require('../utils/serializer');

const findByEmail = async (email) => {
  const db = await connection();
  const users = await db.getTable('users');
  let user = await users.select().where('email = :email')
    .bind('email', email).execute();

  user = user.fetchOne();
  if (!user) {
    return undefined;
  }
  user = Serializer.user(Object.values(user));
  return user;
};

const findById = async (id) => {
  const db = await connection();
  const users = await db.getTable('users');
  let user = await users.select().where('id = :id')
    .bind('id', id).execute();
  user = user.fetchOne();
  user = Serializer.user(Object.values(user));
  return user;
};

async function createUser({
  email, senha, name, last_name: lastName,
}) {
  try {
    const db = await connection();
    const users = await db.getTable('users');
    await users
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, senha, name, lastName)
      .execute();
    return { message: 'sucess' };
  } catch (err) {
    return { error: err };
  }
}

async function updateUser({
  id, email, password, firstName, lastName,
}) {
  try {
    const db = await connection();
    const users = await db.getTable('users');
    const user = await users.update()
      .set('email', email)
      .set('password', password)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute();
    return { message: 'ok' };
  } catch (err) {
    return console.error(err);
  }
}

module.exports = {
  findByEmail,
  updateUser,
  findById,
  createUser,
};
