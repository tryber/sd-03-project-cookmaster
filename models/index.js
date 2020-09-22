const getAll = require('./recipeModels/getAll');
const findRecipeById = require('./recipeModels/findRecipeById');
const findRecipesByQuery = require('./recipeModels/findRecipeByQuery');
const createNewRecipe = require('./recipeModels/createNewRecipe');
const editRecipe = require('./recipeModels/editRecipe');
const findRecipeByUserId = require('./recipeModels/findRecipeByUserId');
const deleteRecipeModel = require('./recipeModels/deleteRecipe');

const findByEmail = require('./userModels/findByEmail');
const findById = require('./userModels/findById');
const registerUser = require('./userModels/registerUser');
const editUser = require('./userModels/editUser');

module.exports = {
  getAll,
  findRecipeById,
  findRecipesByQuery,
  createNewRecipe,
  editRecipe,
  findRecipeByUserId,
  deleteRecipeModel,

  findByEmail,
  findById,
  registerUser,
  editUser,
};
