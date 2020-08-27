const { connection } = require('./connections');

const findBy = async (data, local) => {
  const userData = await connection()
    .then((db) => db
      .getSchema('cookmaster')
      .getTable('users')
      .select(['id', 'first_name', 'last_name', 'password', 'email'])
      .where(`${local} = :${local}`)
      .bind(`${local}`, data)
      .execute())
    .then((results) => results.fetchAll())
    .then((user) => user[0]);

  if (!userData) return null;

  const [id, name, lastName, password, email] = userData;
  return { id, email, password, name, lastName };
};

const insertUser = async (data) =>
  connection().then((db) => {
    db
      .getSchema('cookmaster')
      .getTable('users')
      .insert(['first_name', 'last_name', 'password', 'email'])
      .values([data.name, data.lastName, data.typePass, data.email])
      .execute();
  });

const validateEmail = ({ email }) => {
  const emailReg = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!emailReg) return 'O email deve ter o formato email@mail.com';
  return true;
};

const validateName = ({ name }) => {
  const nameReg = /^[a-zA-Z]*$/.test(name);
  if (name.length < 3 || !nameReg) return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  return true;
};

const validateLastName = ({ lastName }) => {
  const lastNameReg = /^[a-zA-Z]*$/.test(lastName);
  if (lastName.length < 3 || !lastNameReg) return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  return true;
};

const validatePassword = ({ typePass }) => {
  if (typePass.length < 6) return  'A senha deve ter pelo menos 6 caracteres';
  return true;
};

const validateConfPassword = ({ confirmPass }) => {
  if (confirmPass === !typePass) return  'As senhas tem que ser iguais';
  return true;
};


const createUser = async (data) => {
  await insertUser(data);
  return { message: 'Cadastro efetuado com sucesso!' };
};

const updateUserQuery = `UPDATE users
SET email = ?, first_name = ?, last_name = ?
WHERE id = ?`;

const updateUser = async ({ email, name, lastName, id }) =>
connection()
.then((session) =>
session.sql(updateUserQuery)
.bind(email)
.bind(name)
.bind(lastName)
.bind(id)
.execute());


module.exports = {
  createUser,
  updateUser,
  findBy,
  validateEmail,
  validateName,
  validateLastName,
  validatePassword,
  validateConfPassword,
};
