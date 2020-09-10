const connect = require('./connection');

// refatoração para retornar user not found sem quebrar tudo com ajuda do hebert
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
    .then((results) => results.fetchAll()[0]);
    if (user) {
      const userData = ([id, email, password, firstName, lastName]) => ({
        id, email, password, name: `${firstName} ${lastName}`,
      });
      return userData(user);
    }
    return {};
  } catch (err) {
    return err;
  }
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
    .then((results) => results.fetchAll()[0]);
    if (user) {
      const userData = ([id, email, password, firstName, lastName]) => ({
        id, email, password, firstName, lastName,
      });
      return userData(user);
    }
    return {};
  } catch (err) {
    return err;
  }
};

// e essas funções daki n iam sair sem ajuda do hebert
const validadeName = (name = '') => name && !/\d/.test(name) && name.length >= 3;

// regex obtido em: https://stackoverflow.com/questions/742451/what-is-the-simplest-regular-expression-to-validate-emails-to-not-accept-them-bl
const validadeEmail = (email = '') => email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

const getUser = async (uEmail = '') => {
  try {
    const user = uEmail && (await findByEmail(uEmail));
    return user.email;
  } catch (err) {
    return err;
  }
};

const validateUser = async (user) => {
  const res = { error: true, message: '' };
  const { email, password, passwordConfirm, name, surname } = user;
  switch (true) {
    case !validadeEmail(email):
      return { ...res, message: 'O email deve ter o formato email@mail.com' };
    case password.length < 6:
      return { ...res, message: 'A senha deve ter pelo menos 6 caracteres' };
    case passwordConfirm !== password:
      return { ...res, message: 'As senhas tem que ser iguais' };
    case !validadeName(name):
      return {
        ...res,
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !validadeName(surname):
      return {
        ...res,
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { error: false, message: 'Cadastro efetuado com sucesso!', redirect: null, user };
  }
};

const createUser = async (userData) => {
  try {
    const { email, password, name, surname } = userData.user;
    await connect()
      .then((db) => db
        .getTable('users')
        .insert(['email', 'password', 'first_name', 'last_name'])
        .values(email, password, name, surname)
        .execute());

    return userData;
  } catch (err) {
    return err;
  }
};

const updateUser = async (data) => {
  try {
    const { id, email, password, name, surname } = data.user;
    await connect()
      .then((db) => db
        .getTable('users')
        .update()
        .set('email', email)
        .set('password', password)
        .set('first_name', name)
        .set('last_name', surname)
        .where('id = :id')
        .bind('id', id)
        .execute());
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  updateUser,
  validateUser,
};
