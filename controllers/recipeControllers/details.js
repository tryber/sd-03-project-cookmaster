const { findRecipeById } = require('../../models');

const details = async (req, res) => {
  const recipe = await findRecipeById(req.params.id);

  const { ingredients } = recipe;

  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  return res.render('details', { recipe, user: req.user });
};

module.exports = details;
