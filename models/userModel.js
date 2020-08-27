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

const isValid = async (email, password, passconfirm, firstName, lastName) => {
  const patternEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
  const patternName = /[a-zA-Z]/;

  let message = 'Cadastro efetuado com sucesso!';

  if (email && patternEmail.test(email) === false) {
    message = 'O email deve ter o formato email@mail.com';
  }

  if (password.length <= 5) {
    message = 'A senha deve ter pelo menos 6 caracteres';
  }

  if (password !== passconfirm) {
    message = 'As senhas tem que ser iguais';
  }

  if (patternName.test(firstName) === false || firstName.length < 3) {
    message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letrass';
  }

  if (patternName.test(lastName) === false || lastName.length < 3) {
    message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letrass';
  }

  await insertRegister(email, password, firstName, lastName);

  return message;
};

module.exports = {
  findByEmail,
  findById,
  isValid,
  insertRegister,
};
