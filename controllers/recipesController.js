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
  // if (!recipe) return res.status(401).render()
  try {
    res.render('admin/recipeDetails', { recipe, user: req.user });
  } catch (e) {
    console.error(e);
  }
};

const searchPage = async (req, res) => {
  const { q } = req.query;
  if (!q && q !== '') {
    res.render('admin/searchRecipes', { recipes: null, user: req.user });
  }
  const recipes = await recipesModel.findRecipeByName(q);
  try {
    res.render('admin/searchRecipes', { recipes, user: req.user, query: q });
  } catch (e) {
    console.error(e);
  }
};

const newRecipePage = async (req, res) => res.render('admin/registerRecipe', { user: req.user, message: null });

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const userName = `${req.user.name} ${req.user.lastName}`;
  if (recipesModel.invalidRecipe(req.body)) {
    return res.render('admin/registerRecipe',
      { user: req.user, message: 'Digite uma receita válida' });
  }
  try {
    await recipesModel
      .createRecipe({ userId: req.user.id, user: userName, name, ingredients, instructions });
    res.render('admin/registerRecipe',
      { user: req.user, message: 'Receita criada com sucesso' });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  homePage,
  detailsPage,
  searchPage,
  newRecipePage,
  addRecipe,
};
