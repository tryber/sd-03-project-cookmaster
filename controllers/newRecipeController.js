const newRecipeModel = require('../models/newRecipeModel');

const newRecipePage = (req, res) => {
  const user = req.user;
  return res.render('newRecipe', { user, message: null })
};

const newRecipeInsert = async (req, res) => {
  const { newRecipeName, ingredient, howToPrepare } = req.body;
  const { id, firstName, lastName } = req.user;
  const userFullName = `${firstName} ${lastName}`;
  await newRecipeModel.addNewRecipe(id, userFullName, newRecipeName, ingredient, howToPrepare)
  // console.log(req.body);
  // console.log(req.user);
  return res.render('newRecipe', { user, message: 'Nova Receita adicionada!' });
}

module.exports = {
  newRecipePage,
  newRecipeInsert,
};
