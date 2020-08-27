const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const userModel = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res, next) => {
  const { email, password, redirect } = req.body;

  if (!email || !password)
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });

  const user = await userModel.findByEmail(email);
  if (!user || user.password !== password)
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  res.redirect(redirect || '/admin');
};

const signupForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/signup', {
    message: null,
    redirect: req.query.redirect,
  });
};

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const validString = (value) => !/^[a-zA-Z]+$/.test(value);

const renderReturn = (message, res) => {
  return res.render('admin/signup', {
    message,
    redirect: null,
  })
}

const signup = async (req, res, next) => {
  const { email, password, confirmPassword, name, lastName } = req.body;

  if (Object.values(req.body).map((el) => !el).includes(true)){
    return renderReturn('Preencha todos os dados', res)
  } else if(!emailRegex.test(email)) {
    return renderReturn('O email deve ter o formato email@mail.com', res)
  } else if(password.length < 6) {
    return renderReturn('A senha deve ter pelo menos 6 caracteres', res)
  } else if(password !== confirmPassword) {
    return renderReturn('As senhas tem que ser iguais', res)
  } else if(name.length < 3 || validString(name)) {
    return renderReturn(
      'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras', res
    )
  } else {
    await userModel.setUser(req.body);
    const user = await userModel.findByEmail(email);
    if (user)
    return renderReturn(
      'Cadastro efetuado com sucesso!', res
    );
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

module.exports = {
  login,
  loginForm,
  signup,
  signupForm,
  logout,
};
