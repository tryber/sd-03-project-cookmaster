const connect = require('./connect');

const addUser = (email, password, name, lastName) =>
  connect().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute(),
  );


const nameIsValid = (name) => {
  const nameRegEx = /^[a-zA-Z]+$/i;
  if (!nameRegEx.test(name) || name.length < 3) return true;
  return false;
};

const newUserIsValid = (email, password, confirmPassword, name, lastName) => {
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
  addUser,
  newUserIsValid,
};
