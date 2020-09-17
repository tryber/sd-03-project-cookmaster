const { findRecipeById } = require('../../models');

const editRecipeForm = async (req, res) => {
  const recipe = await findRecipeById(req.params.id);
  const { id } = req.user;
  const { ingredients, userId, recipeId } = recipe;
  const ingredientsArr = ingredients.split(',');

  recipe.ingredients = ingredientsArr;

  if (userId !== id) res.redirect(`/recipes/${recipeId}`);

  return res.render('admin/edit', { recipe, user: req.user });
};

module.exports = editRecipeForm;
