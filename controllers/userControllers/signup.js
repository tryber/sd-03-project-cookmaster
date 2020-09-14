const userModel = require('../../models');

const regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const signup = async (req, res) => {
  const { email, password, passwordConfirm, name, lastName } = req.body;

  if (!regex.test(email))
    res.render('signup', {
      message: 'O email deve ter o formato email@mail.com',
    });

  if (password.length < 5)
    res.render('signup', {
      message: 'A senha deve ter pelo menos 6 caracteres',
    });

  if (password !== passwordConfirm)
    res.render('signup', {
      message: 'As senhas tem que ser iguais',
    });

  if (name.length < 2 || typeof name !== 'string')
    res.render('signup', {
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  if (lastName.length < 2 || typeof lastName !== 'string')
    res.render('signup', {
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    });

  await userModel.register(email, password, name, lastName);

  res.status(201).render('signup', { message: 'Cadastro efetuado com sucesso!' });

};

module.exports = signup;

