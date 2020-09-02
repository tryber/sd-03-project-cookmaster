const connect = require('./connection');

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
  }
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
  }
  return 1;
};
/**
 * if (!passwordConfirm || !name || !surname) {
    return { error: true, message: 'Dados incompletos' };
  }
  if (password !== passwordConfirm) {
    return { error: true, message: 'As senhas tem que ser iguais' };
  }
  if (!name >= 3 && name.match(/\d/)) {
    return {
      error: true,
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    };
  }
  if (!surname >= 3 && surname.match(/\d/)) {
    return {
      error: true,
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    };
  }
  return { error: false, message: 'Usuário válido', user, redirect: null };
 */
const validateUser = (user) => {
  const res = { error: false, message: '', user };
  switch (user) {
    case !user.email || user.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$i/):
      res.error = true;
      res.message = 'O email deve ter o formato email@mail.com';
      brake;
    case !password || !password >= 6:
      res.error = true;
      res.message = 'A senha deve ter pelo menos 6 caracteres';
    default:
      res.message = 'Cadastro efetuado com sucesso!';
      brake;
  }
  return res;
};

const createUser = async (user) => {
  const { email, password, name, surname } = user;
  try {
    await connect()
      .then((db) => db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, surname)
      .execute());

    return {
      error: false,
      message: 'Cadastro efetuado com sucesso!',
      redirect: '',
    };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  return 1;
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  validateUser,
};
