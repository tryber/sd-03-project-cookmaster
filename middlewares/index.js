const { verifyRegister } = require('./register');
const { authMiddleware } = require('./auth');

module.exports = {
  auth: authMiddleware,
  verifyRegister,
};
