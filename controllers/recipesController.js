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
    res.render('admin/registerRecipe',
      { user: req.user, message: 'Digite uma receita válida' });
  }
  try {
    await recipesModel
      .createRecipe({ userId: req.user.id, user: userName, name, ingredients, instructions });
    // res.render('admin/registerRecipe',
    //   { user: req.user, message: 'Receita criada com sucesso' });
    res.redirect('/');
  } catch (e) {
    console.error(e);
  }
};

const editRecipePage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.findRecipeById(id);
  try {
    res.render('admin/editRecipe', { user: req.user, recipe, id, message: null });
  } catch (e) {
    console.error(e);
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.user;
  const recipeId = req.params.id;
  const { userId } = await recipesModel.findRecipeById(id);
  const recipe = req.body;
  // recipe['id'] = ;
  if (!recipesModel.verifyUser(userId, id)) {
    res.redirect('/');
  }
  try {
    await recipesModel.attRecipe(recipe, parseInt(recipeId, 10));
    // res.render('admin/editRecipe',
    // { user: req.user, recipe, id, message: 'Atualizado com sucesso' })
    res.redirect('/');
  } catch (e) {
    console.error(e);
  }
};

const mineRecipesPage = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipesModel.findAllRecipesByUserId(id);
  try {
    res.render('admin/recipesByOwner', { recipes, user: req.user });
  } catch (e) {
    console.error(e);
  }
};


const deleteRecipeForm = async (req, res) => {
  const { id } = req.params;
  res.render('admin/deleteRecipe', { id, message: null });
};
const deleteRecipe = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { password } = req.body;
  const userAuthentication = await recipesModel.verifyPassword(password, userId);
  if (!userAuthentication) {
    res.render('admin/deleteRecipe', { id, message: 'Senha Incorreta.' });
  }
  await recipesModel.deleteRecipeById(id);
  try {
    res.redirect('/');
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
  updateRecipe,
  editRecipePage,
  mineRecipesPage,
  deleteRecipeForm,
  deleteRecipe,
};
