const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');
const { recipeDetails } = require('../models');

const recipeDetailsForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeDetails.findRecipeById(id);
  return res.render('recipes/details', { recipe, user: req.user });
};

module.exports = {
  recipeDetailsForm,
};
