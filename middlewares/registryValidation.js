const userModel = require('../models/userModel');

// Regex criado com orientação do instrutor Neto
const validateName = (name = '') => name && /^[A-Z][a-z]{2,}$/i.test(name);

/* Regex obtido em
https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address */
const validateEmail = (email = '') => email
  && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);

const getUser = async (userEmail = '') => {
  try {
    const user = userEmail && (await userModel.findByEmail(userEmail));
    return user.email;
  } catch (error) {
    return error;
  }
};

const validationMessages = {
  user: 'Usuário já cadastrado, por favor faça login',
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  name: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  default: 'Cadastro efetuado com sucesso!',
};

async function ValidateUser(email, password, confirmPassword, name, lastName) {
  const searchUser = await getUser(email);
  switch (true) {
    case email === searchUser:
      return validationMessages.user;
    case !validateEmail(email):
      return validationMessages.email;
    case password.length < 6:
      return validationMessages.password;
    case confirmPassword !== password:
      return validationMessages.confirmPassword;
    case !validateName(name):
      return validationMessages.name;
    case !validateName(lastName):
      return validationMessages.lastName;
    default:
      return validationMessages.default;
  }
}

const registerValidationMiddleware = async (req, _res, next) => {
  const {
    email, password, confirmPassword, name, lastName,
  } = req.body;
  const dataValidation = await ValidateUser(email, password, confirmPassword, name, lastName);
  req.message = dataValidation;
  if (req.message === validationMessages.default) {
    req.validate = true;
  } else {
    req.validate = false;
  }

  return next();
};

module.exports = registerValidationMiddleware;
