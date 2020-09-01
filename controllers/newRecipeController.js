const newRecipeModel = require('../models/newRecipeModel');

const ingredientsArr = [];
// Esse é o lugar ideal para fazer a adiçao dos ingredientes no array? Visando o MVC?

const newRecipePage = (req, res) => {
  const user = req.user;
  return res.render('newRecipe', { user, message: null, ingredientsArr });
};

const newRecipeInsert = async (req, res) => {
  const { newRecipeName, ingredient, howToPrepare } = req.body;
  const user = req.user;
  const { id, firstName, lastName } = user;
  const userFullName = `${firstName} ${lastName}`;
  await newRecipeModel.addNewRecipe(id, userFullName, newRecipeName, ingredient, howToPrepare);
  return res.redirect('/');
};

const addIngredientContr = (req, res) => {
  const { ingredient } = req.body;
  const user = req.user;

  ingredientsArr.push(ingredient);

  return res.render('newRecipe', { user, message: null, ingredientsArr });
};

module.exports = {
  newRecipePage,
  newRecipeInsert,
  addIngredientContr,
};
