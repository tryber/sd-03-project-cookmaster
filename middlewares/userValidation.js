const userModel = require('../models/userModel');

const validationMessages = {
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  name: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  user: 'Usuário já cadastrado, por favor faça login',
  default: 'Cadastro efetuado com sucesso!',
};

const getUser = async (userEmail) => {
  const user = await userModel.findByEmail(userEmail);
  return !!user;
};

/* Regex obtido em https://html.spec.whatwg.org/multipage/
input.html#valid-e-mail-address */
const validateEmail = (email) => email && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(email);

// Regex criado com orientação do instrutor Neto
const validateName = (name) => name && (/^[A-Z][a-z]{3,}$/).test(name);

const verifyPasswords = (userPassword, passwordConfirm) => {
  if (userPassword < 6) return validationMessages.password;
  if (passwordConfirm !== userPassword) return validationMessages.confirmPassword;
  return null;
};

const verifyNames = (userName, userlastName) => {
  if (!validateName(userName)) return validationMessages.name;
  if (!validateName(userlastName)) return validationMessages.lastName;
  return null;
};

function ValidateUser(email, password, confirmPassword, name, lastName) {
  if (getUser(email)) return validationMessages.user;
  if (!validateEmail(email)) return validationMessages.email;
  if (verifyPasswords(password, confirmPassword)) return verifyPasswords(password, confirmPassword);
  if (verifyNames(name, lastName)) return verifyNames(name, lastName);
  return validationMessages.default;
}

const registerValidationMiddleware = (req, _res, next) => {
  const {
    email,
    password,
    confirmPassword,
    name,
    lastName,
  } = req.body;

  const dataValidation = ValidateUser(email, password, confirmPassword, name, lastName);

  req.message = dataValidation;

  return next();
};

module.exports = registerValidationMiddleware;
