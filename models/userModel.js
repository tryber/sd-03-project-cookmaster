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

const validateUser = (user) => {
  const res = { error: false, message: '', user, redirect: null };
  switch (user) {
    case !user.email || user.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$i/):
      res.error = true;
      res.message = 'O email deve ter o formato email@mail.com';
      brake;
    case !user.password || !user.password >= 6:
      res.error = true;
      res.message = 'A senha deve ter pelo menos 6 caracteres';
      brake;
    case !user.passwordConfirm || !user.passwordConfirm === user.password:
      res.error = true;
      res.message = 'As senhas tem que ser iguais';
      brake;
    case !user.name || !user.name >= 3 || user.name.match(/\d/):
      res.error = true;
      res.message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
      brake;
    case !user.surname || !user.surname >= 3 || user.surname.match(/\d/):
      res.error = true;
      res.message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
      brake;
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
