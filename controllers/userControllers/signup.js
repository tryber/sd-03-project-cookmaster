const userModel = require('../../models');

const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const validaEmail = (email, res) => {
  if (!regex.test(email)) {
    res.render('signup', {
      message: 'O email deve ter o formato email@mail.com',
    });
  }
};

const validaSenhaMaior = (password, res) => {
  if (password.length < 5) {
    res.render('signup', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });
  }
};

const validaConfirmaSenha = (password, passwordConfirm, res) => {
  if (password !== passwordConfirm) {
    res.render('signup', {
      message: 'As senhas tem que ser iguais',
    });
  }
};

const validaNome = (name, res) => {
  if (name.length < 2 || typeof name !== 'string') {
    res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
};

const validaSegundoNome = (lastName, res) => {
  if (lastName.length < 2 || typeof lastName !== 'string') {
    res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });
  }
};

const signup = async (req, res) => {
  const { email, password, passwordConfirm, name, lastName } = req.body;

  validaEmail(email, res);

  validaSenhaMaior(password, res);

  validaConfirmaSenha(password, passwordConfirm, res);

  validaNome(name, res);

  validaSegundoNome(lastName, res);

  await userModel.register(email, password, name, lastName, res);

  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = signup;
