const editRecipeModel = require('../models/editRecipeModel');


const editRecipePage = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const recipeDetails = await editRecipeModel.getRecipeById(id);

  if (editRecipeModel.canEdit(user.id, recipeDetails.userId)) {
    return res.render('editRecipe', { message: null, recipeDetails, user });
  }

  return res.redirect(`/recipes/${id}`);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const { editedName, ingredient, howToPrepare } = req.body;
  await editRecipeModel.editRecipe(id, editedName, ingredient, howToPrepare);

  // const recipeDetails = await editRecipeModel.getRecipeById(id);

  return res.render('editRecipe', { message: 'Receita Editada com sucesso!', recipeDetails: req.body, user });
};

module.exports = {
  editRecipePage,
  editRecipe,
};
