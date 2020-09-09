const connect = require('./connection');

const registerUser = async (
  email,
  password,
  firstName,
  lastName
) => {
  const db = await connect();

  await db.getTable('users')
    .insert((['email', 'password', 'first_name', 'last_name']))
    .values(email, password, firstName, lastName)
    .execute();
};

const isValidUser = (email, password, confirmPassword, firstName, lastName) => {
  switch(true) {
    case (!/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email)):
      return {
        validation: false,
        message: 'O email deve ter o formato email@mail.com',
      };
    case (password.length < 6):
      return {
        validation: false,
        message: 'A senha deve ter pelo menos 6 caracteres',
      };
    case (password !== confirmPassword):
      return {
        validation: false,
        message: 'As senhas tem que ser iguais',
      };
    case (firstName.length < 3):
      return {
        validation: false,
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case (lastName.length < 3):
      return {
        validation: false,
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { validation: true, message: 'Cadastro efetuado com sucesso!' };
  }
}

module.exports = {
  registerUser,
  isValidUser,
};
