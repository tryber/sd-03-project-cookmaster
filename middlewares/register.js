const { register } = require('../controllers/userController.js');

const PATTERN = {
  email: /^[A-z0-9]*@[A-z0-9]*.com$/,
  firstName: /^[A-z]*$/,
  lastName: this.firstName,
};

const inválidMessages = {
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  firstName: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
};

function conditions(array) {
  let message = null;
  array.some(([userFeature, size]) => {
    if (userFeature.length < size || !userFeature.match(PATTERN[userFeature])) {
      message = inválidMessages[userFeature];
    }
    return null;
  });
  return message;
}

function verifyRegister(req, res, next) {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send('Faltou informação');
    }
    const message = conditions([
      [email, 0],
      [password, 0],
      [firstName, 3],
      [lastName, 3],
    ]);
    if (message) {
      return res.status(400).send(message);
    } else if (password !== confirmPassword) {
      return res.status(400).send(inválidMessages.confirmPassword);
    }
    register(email, password, firstName, lastName);
  } catch (err) {
    // console.error('on register', err);
    res.status(500).send('Something went wrong during register');
  }
  return next();
}

module.exports = {
  verifyRegister,
};
