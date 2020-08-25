const { register } = require('../controllers/userController.js');

function verifyRegister(req, res, next) {
  try {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).send('Faltou informação ou informação errada');
    } else if (password !== confirmPassword) {
      return res.status(400).send('senhas incompatíveis');
    }
    register(email, password, firstName, lastName);
  } catch (err) {
    console.error('on register', err);
    res.status(500).send('Something went wrong during register');
  }
  return next();
}

module.exports = {
  verifyRegister,
};