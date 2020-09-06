const { registerRecipe } = require('../models');

const enterNewRecipes = async (req, res) => {
  return res.render('recipes/new', { user: req.user });
};

const addNewRecipes = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { lastName, id } = req.user;
  const firstName = req.user.name;
  const fullName = `${firstName} ${lastName}`;

  await registerRecipe.addRecipe(id, fullName, name, ingredients, instructions);

  return res.redirect('/');
};

module.exports = {
  addNewRecipes,
  enterNewRecipes,
};
