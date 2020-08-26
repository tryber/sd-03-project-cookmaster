const { v4: uuid } = require('uuid');
const connection = require('./connection');

const findByEmail = async (email) => {
  const db = await connection();
  const users = await db.getTable('users');
  const user = await users.select().where('email = :email')
    .bind('email', email).execute();

  return user.fetchOne();
};

const findById = async (id) => id;

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
