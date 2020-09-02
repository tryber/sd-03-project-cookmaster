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
    return (err);
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

const res = { error: true, message: '' };
const validateUser = async (user) => {
  const { email, password, passwordConfirm, name, surname } = user;
  switch (true) {
    case email === await getUser(email) && password && passwordConfirm && name && surname:
      return { ...res, message: 'Usuário já cadastrado' };
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
  const { email, password, name, surname } = userData.user;
  try {
    await connect()
      .then((db) => db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, surname)
      .execute());

    return userData;
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
