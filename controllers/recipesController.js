const recipesModel = require('../models/recipesModel');

const homePage = async (req, res) => {
  const recipes = await recipesModel.findAllRecipes();
  // console.log(recipes);
  try {
    res.render('home', { recipes, user: req.user });
  } catch (e) {
    console.error(e);
  }
};

const detailsPage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.findRecipeById(id);
  console.log(recipe);
  // if (!recipe) return res.status(401).render()
  try {
    res.render('admin/recipeDetails', { recipe, user: req.user });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  homePage,
  detailsPage,
};
