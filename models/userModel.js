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
  const res = { error: true, message: '', redirect: null, user };
  switch (user) {
    case !user.email || user.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$i/):
      res.message = 'O email deve ter o formato email@mail.com';
      return res;
    case !user.password || !user.password >= 6:
      res.message = 'A senha deve ter pelo menos 6 caracteres';
      return res;
    case !user.passwordConfirm || !user.passwordConfirm === user.password:
      res.message = 'As senhas tem que ser iguais';
      return res;
    case !user.name || !user.name >= 3 || user.name.match(/\d/):
      res.message = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
      return res;
    case !user.surname || !user.surname >= 3 || user.surname.match(/\d/):
      res.message = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
      return res;
    default:
      res.error = false;
      res.message = 'Cadastro efetuado com sucesso!';
      return res;
  }
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
