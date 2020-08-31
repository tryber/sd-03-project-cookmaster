const connect = require('./connect');

const getUserById = async (userId) => {
  const db = await connect();
  const result = await db.getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :userId')
    .bind('userId', userId)
    .execute();

  const [id, email, password, firstName, lastName] = await result.fetchAll()[0];
  return { id, email, password, firstName, lastName };
};

const editProfile = async (id, email, userFirstName, userLastName, password) => {
  const usersId = parseInt(id, 10);
  const db = await connect();
  await db.getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', userFirstName)
    .set('last_name', userLastName)
    .where('id = :usersId')
    .bind('usersId', usersId)
    .execute();

  return true;
};

const nameIsValid = (name) => {
  const nameRegEx = /^[a-zA-Z]+$/i;
  if (!nameRegEx.test(name) || name.length < 3) return true;
  return false;
};

const changesAreValid = (email, password, confirmPassword, name, lastName) => {
  const emailRegEx = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  const messageArr = [];
  if (!emailRegEx.test(email)) messageArr.push('O email deve ter o formato email@mail.com');

  if (password.length < 6) messageArr.push('A senha deve ter pelo menos 6 caracteres');

  if (password !== confirmPassword) messageArr.push('As senhas tem que ser iguais');

  if (nameIsValid(name)) {
    messageArr.push('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }

  if (nameIsValid(lastName)) {
    messageArr.push('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  return messageArr;
};

module.exports = {
  getUserById,
  editProfile,
  changesAreValid,
};
