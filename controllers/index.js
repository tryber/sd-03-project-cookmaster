const list = require('./recipeControllers/list');
const details = require('./recipeControllers/details');
const search = require('./recipeControllers/search');
const newRecipeForm = require('./recipeControllers/newRecipeForm');
const newRecipe = require('./recipeControllers/newRecipe');
const editRecipeForm = require('./recipeControllers/editRecipeForm');
const edit = require('./recipeControllers/edit');
const getUser = require('./recipeControllers/getUser');
const deleteRecipeForm = require('./recipeControllers/deleteRecipeForm');
const deleteRecipe = require('./recipeControllers/deleteRecipe');

const loginForm = require('./userControllers/loginForm');
const login = require('./userControllers/login');
const formSignup = require('./userControllers/formSignup');
const signup = require('./userControllers/signup');
const logout = require('./userControllers/logout');
const editUserForm = require('./userControllers/editUserForm');
const editUserProfile = require('./userControllers/editUserProfile');

module.exports = {
  list,
  details,
  search,
  newRecipeForm,
  newRecipe,
  editRecipeForm,
  edit,
  getUser,
  deleteRecipeForm,
  deleteRecipe,

  loginForm,
  login,
  formSignup,
  signup,
  logout,
  editUserForm,
  editUserProfile,
};
