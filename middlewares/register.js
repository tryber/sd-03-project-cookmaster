const { register } = require('../controllers/userController.js');

const PATTERN = {
  email: /^[A-z0-9]*@[A-z0-9]*.com$/,
  password: '',
  firstName: /^[A-z]*$/,
  lastName: /^[A-z]*$/,
};

const invalidMessages = {
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  firstName: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
};

const SIZE = {
  email: 0,
  password: 6,
  firstName: 3,
  lastName: 3,
};

function conditions(obj) {
  let message = null;
  Object.entries(obj).some(([userFeature, value]) => {
    if (value.length < SIZE[userFeature] || !value.match(PATTERN[userFeature])) {
      message = invalidMessages[userFeature];
      return true;
    }
    return false;
  });
  return message;
}

function verifyRegister(req, res, next) {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    const message = conditions({
      email,
      password,
      firstName,
      lastName,
    });

    if (message) {
      return res.status(400).render('register', { message });
    } else if (password !== confirmPassword) {
      return res.status(400).render('register', { message: invalidMessages.confirmPassword });
    }
    register(email, password, firstName, lastName);
    return next();
  } catch (err) {
    return res.status(500).send('Something went wrong during register');
  }
}

module.exports = {
  verifyRegister,
};
