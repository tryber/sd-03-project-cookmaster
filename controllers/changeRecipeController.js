const { changeRecipe } = require('../models');

const reciveDetailsForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await changeRecipe.findChangeRecipeById(id);
  const idUser = req.user.id;
  if (recipe.userId !== idUser) {
    return res.redirect(`/recipes/${id}`);
  }
  return res.render('recipes/transition', { recipe, user: req.user });
};

const changeDetailsForm = async (req, res, _next) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;

  await changeRecipe.alterRecipe(id, name, ingredients, instructions);

  res.redirect('/');
};

module.exports = {
  reciveDetailsForm,
  changeDetailsForm,
};
