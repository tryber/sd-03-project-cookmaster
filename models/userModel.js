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

  return firstName ? { id, firstName, lastName, password, email } : null;
};

const findById = async (id) => {
  const db = await connect();

  const results = await db
    .getTable('users')
    .select(['first_name', 'last_name', 'password', 'email'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const [firstName, lastName, password, email] = await results.fetchOne();

  return firstName ? { id, firstName, lastName, password, email } : null;
};

const addUser = async (email, password, firstName, lastName) => {
  const db = await connect();
  return db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
}

const emailIsValid = (email = '') => email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

const passwordIsValid = (password = '') => password.length > 5;

const confirmedPassword = (password = '', confirmPassword = '') => password === confirmPassword;

const nameIsValid = (name = '') => name.match(/^\w{3,}/i)

module.exports = {
  findByEmail,
  findById,
  addUser,
  emailIsValid,
  passwordIsValid,
  confirmedPassword,
  nameIsValid,
};
