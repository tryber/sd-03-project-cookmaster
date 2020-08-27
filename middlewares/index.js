const { authMiddleware } = require('./auth');
const registerValidationMiddleware = require('./userValidation');

module.exports = {
  auth: authMiddleware,
  validation: registerValidationMiddleware,
};
