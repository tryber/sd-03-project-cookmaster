const { v4: uuid } = require('uuid');
const connection = require('./connection');
const Serializer = require('../utils/serializer');

const findByEmail = async (email) => {
  const db = await connection();
  const users = await db.getTable('users');
  let user = await users.select().where('email = :email')
    .bind('email', email).execute();
  user = user.fetchOne();
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

module.exports = {
  findByEmail,
  findById,
  createUser,
};
