const userModel = require('../models/userModel');

const findUser = async (userEmail = '') => {
  try {
    const user = userEmail && (await userModel.findByEmail(userEmail));
    return user.email;
  } catch (error) {
    return error;
  }
};

const allowedSizes = {
  email: 0,
  password: 6,
  firstName: 3,
  lastName: 3,
};

const regexValidations = {
  email: /^[A-z0-9]*.?[A-z0-9]*@[A-z0-9]*.com$/,
  password: '',
  firstName: /^[A-z]*$/,
  lastName: /^[A-z]*$/,
};

const returnedMessages = {
  user: 'Usuário já existe!',
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  name: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  default: 'Cadastro efetuado com sucesso!',
};

async function validate(user) {
  const userExist = await findUser(user.email);
  let message = null;
  if (userExist) return returnedMessages.user;

  Object.entries(user).some(([key, value]) => {
    if (value.length < allowedSizes[key] || !value.match(regexValidations[key])) {
      message = returnedMessages[key];
      return true;
    }
    return false;
  });
  return message;
}

const registerValidationMiddleware = async (req, res, next) => {
  const {
    email, password, confirmPassword, name, lastName,
  } = req.body;

  const validationMessage = await validate({ email, name, lastName, password, confirmPassword });

  if (validationMessage) {
    return res.status(400).render('admin/signup', { message: validationMessage });
  } else if (password !== confirmPassword) {
    return res.status(400).render('admin/signup', { message: returnedMessages.confirmPassword });
  }

  return next();
};

module.exports = {
  registerValidationMiddleware,
};
