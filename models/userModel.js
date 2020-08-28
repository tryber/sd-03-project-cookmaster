const connection = require('./connection');

const findByEmail = async (email) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :email')
      .bind('email', email)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then(([id, userEmail, password, name, lastName]) => ({
      id,
      userEmail,
      password,
      name,
      lastName,
    }))
);

const findById = async (id) => (
  connection()
    .then((schema) => schema
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchAll())
    .then(([userId, email, password, name, lastName]) => ({
      id: userId,
      email,
      password,
      name,
      lastName,
    }))
);

const insertRegister = async (email, password, firstName, lastName) => {
  connection()
    .then((schema) => schema
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute());
};

const patternName = /[a-zA-Z]/;

const validEmail = (email) => {
  const patternEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  if (patternEmail.test(email) === false) return false;
  return true;
};

const isValid = async (email, password, passconfirm, firstName, lastName) => {
  if (validEmail(email) === false) return 'O email deve ter o formato email@mail.com';

  if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres';

  if (password !== passconfirm) return 'As senhas tem que ser iguais';

  if (patternName.test(firstName) === false || firstName.length < 3) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letrass';
  }

  if (patternName.test(lastName) === false || lastName.length < 3) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letrass';
  }

  return true;
};

module.exports = {
  findByEmail,
  findById,
  isValid,
  insertRegister,
};
