const { authMiddleware } = require('./auth');
const { registerValidationMiddleware } = require('./signupMiddleware');

module.exports = {
  auth: authMiddleware,
  registerValidationMiddleware,
};
