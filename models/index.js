// user
const findByEmail = require('./userModels/findByEmail');
const findById = require('./userModels/findById');
const register = require('./userModels/register');
// recipe
const getAll = require('./recipeModels/getAll');
const findRecipeById = require('./recipeModels/findRecipeById');

module.exports = {
  findByEmail,
  findById,
  register,

  getAll,
  findRecipeById,
};
