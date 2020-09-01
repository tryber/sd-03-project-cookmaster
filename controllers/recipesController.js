const recipesModal = require('../models/recipesModel');
const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    const { user } = req;
    const recipes = await recipesModal.finfByRecipes(req.params.id);

    if (!user) return res.render('home', { recipes, user: null });

    return res.render('home', { recipes, user });
  } catch (error) {
    return error;
  }
};

const listRecipesById = async (req, res) => {
  try {
    const { user } = req;
    const recipe = await recipesModal.findRecipesById(req.params.id);

    return res.render('details', { recipe: recipe[0], user });
  } catch (error) {
    return error;
  }
};

const listsharchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const { user } = req;

    if (!query) return res.render('shearchRecipes', { shearchRecipes: [], user });
    const shearchRecipes = await recipesModal.findSharchRecipe(query);
    return res.render('shearchRecipes', { shearchRecipes, user });
  } catch (error) {
    return error;
  }
};

const formRecipe = async (req, res) => res.render('newRecipeForm', { user: req.user });

const newRecipes = async (req, res) => {
  const { user } = req.user;
  const { recipeName, ingredients, instructions } = req.body;
  const { id, name, lastName } = user;
  const userName = `${name} ${lastName}`;

  await recipesModal.createNewRecipes(id, userName, recipeName, ingredients, instructions);

  return res.redirect('/', { user });
};

const formEditRecipe = async (req, res) => {
  //  conferência do cód com PR da Carolis.
  const { id } = req.user;
  const recipe = await recipesModal.findRecipesById(req.params.id);

  const { userId } = await recipe[0];

  if (userId !== id) return res.redirect('/');

  return res.render('editRecipe', { recipe: recipe[0], user: req.user });
};

const editRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;

  await recipesModel.editRecipe(req.params.id, recipeName, ingredients, instructions);

  return res.redirect('/user/recipes');
};

const getUserRecipe = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipesModal.findAllRecipesById(id);

  return res.render('recipeUser', { recipes, user: req.user });
};

const deleteRecipeForm = async (req, res) =>
  res.render('deleteRecipe', { id: req.params.id, message: null, user: req.user });

const deleteRecipeUser = async (req, res) => {
  const { id } = req.user;
  const passwordUser = req.body.password;
  const [passwordBank] = await recipesModal.getPasswordToDelete(id);

  try {
    if (passwordUser === passwordBank) {
      await recipesModal.deleteRecipe(req.params.id);
      return res.redirect('/');
    }
    return res.render('deleteRecipe', {
      id: req.params.id,
      message: 'Senha Incorreta.',
      user: req.user,
    });
  } catch (error) {
    // console.error('error');
    return error;
  }
};

module.exports = {
  listRecipes,
  listRecipesById,
  listsharchRecipes,
  newRecipes,
  formRecipe,
  formEditRecipe,
  editRecipe,
  getUserRecipe,
  deleteRecipeForm,
  deleteRecipeUser,
};
