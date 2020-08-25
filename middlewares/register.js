const { register } = require('../controllers/userController.js');

const EMAIL_PATTERN = /^[A-z0-9]@[A-z0-9].com$/

function verifyRegister(req, res, next) {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send('Faltou informação');
    } else if (password !== confirmPassword) {
      return res.status(400).send('senhas incompatíveis');
    } else if (email.match(EMAIL_PATTERN)) {
      return res.status(400).send('email inválido');
    } else if (senha) {

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
