const connect = require('./connection');

const validateUser = (user) => {
  const { email, password, passwordConfirm, name, surname } = user
  if (!email || !password || !passwordConfirm || !name || !surname) {
    return { error: true, message: 'Dados incompletos' };
  };
  if (password !== passwordConfirm) {
    return { error: true, message: 'senhas não conferem' };
  };
  return { error: false, message: 'Usuário válido', user };
};

const findByEmail = async (uEmail) => {
  try {
    const user = await connect()
      .then((db) => db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', uEmail)
      .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, email, password, firstName, lastName]) => ({
      id, email, password, name: `${firstName} ${lastName}`,
    }));

    return user;
  } catch (err) {
    console.error(err);
    process.exit(1);
  };
  return 1;
};

const findById = async (uId) => {
  try {
    const user = await connect()
      .then((db) => db
      .getTable('users')
      .select()
      .where('id = :id')
      .bind('id', uId)
      .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, email, password, firstName, lastName]) => ({
      id, email, password, name: `${firstName} ${lastName}`,
    }));

    return user;
  } catch (err) {
    console.error(err);
    process.exit(1);
  };
  return 1;
};

const createUser = async (user) => {
  try {
    console.log(user);
  } catch (err) {
    console.error(err);
    process.exit(1);
  };
};

module.exports = {
  findByEmail,
  findById,
  validateUser,
};
