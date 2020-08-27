const { authMiddleware } = require('./auth');
const registerValidationMiddleware = require('./registryValidation');
const { recipeDetailsMiddleware } = require('./recipeFilter');

module.exports = {
  auth: authMiddleware,
  validation: registerValidationMiddleware,
  recipeFilter: recipeDetailsMiddleware,
};
