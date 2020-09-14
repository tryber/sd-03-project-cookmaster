const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../../middlewares/auth');

const { findByEmail } = require('../../models');

const verificarEmailSenha = async (email, password, res) => {
  if (!email || !password) {
    return await res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });
  }
};

const login = async (req, res) => {
  const { email, password, redirect } = req.body;
  verificarEmailSenha(email, password, res);

  const user = await findByEmail(email);

  if (!user || user.password !== password) {
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });
  }

  const token = uuid();
  SESSIONS[token] = user.id;

  const tudoOk = (res, token, redirect) => {
    res.cookie('token', token, { httpOnly: true, sameSite: true });
    res.redirect(redirect || '/admin');
  };

  return tudoOk(res, token, redirect);
};

module.exports = login;
