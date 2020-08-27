// Ref. Código já veio pronto em /admin/login. O código abaixo foi baseado nele
const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('signup', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;
  if (!email || !password)
    return res.render('signup', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (typeof (user) === 'undefined')
    return res.render('signup', {
      message: 'Usuário não cadastrado',
      redirect: null,
    });

  if (!user || user.password !== password)
    return res.render('signup', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

const validateFields = (form) => {
  const errors = [];
  // Validações
  // Ref. Regex email em https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // Obs.: Tive que transformar em função porque o codeclimate reclamava de 'Unnecessary escape character: [. '
  const regexEmail = (eml) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(eml);
  // Ref. Regex name em https://stackoverflow.com/questions/3532053/regular-expression-for-only-characters-a-z-a-z
  const regexName = /^[a-z]*$/i;
  if (!regexEmail(form.email)) {
    errors.push('O email deve ter o formato email@mail.com');
  }
  if (!form.password || form.password.length < 6) {
    errors.push('A senha deve ter pelo menos 6 caracteres');
  }
  if (!form.password || form.password !== form.passwordRetype) {
    errors.push('As senhas tem que ser iguais');
  }
  if (!form.name || form.name.length < 3 || !regexName.test(form.name)) {
    errors.push('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  if (!form.surname || form.surname.length < 3 || !regexName.test(form.surname)) {
    errors.push('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
  }
  return errors;
};

const signinForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('signin', {
    message: null,
    redirect: req.query.redirect,
    error: [],
  });
};

const signin = async (req, res, next) => {
  // const { email, password, passwordRetype, name, surname, redirect } = req.body;
  // Validações
  const errors = validateFields(req.body);

  if (errors.length > 0) {
    return res.render('signin', {
      message: 'Erros foram encontrados:',
      redirect: null,
      error: errors,
    });
  }

  return res.render('signin', {
    message: 'Cadastro efetuado com sucesso!',
    redirect: null,
    error: errors,
  });
};

module.exports = {
  login,
  loginForm,
  logout,
  signin,
  signinForm,
};
