// user
const loginForm = require('./userControllers/loginForm');
const login = require('./userControllers/login');
const logout = require('./userControllers/logout');
const formSignup = require('./userControllers/formSignup');
const signup = require('./userControllers/signup');
// recipe
const getAllrecipes = require('./recipeControllers/getAll');
const recipeDetails = require('./recipeControllers/recipeDetails');

module.exports = {
  loginForm,
  login,
  logout,
  formSignup,
  signup,

  getAllrecipes,
  recipeDetails,
};
