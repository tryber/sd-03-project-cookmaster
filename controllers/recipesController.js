const recipeModel = require('../models/recipeModel');

const recipes = async (req, res) => {
  const { user } = req;
  const listRecipes = await recipeModel.getRecipes();
  // if (!user) return res.render('home', { listRecipes, user: null });
  return res.render('home', { listRecipes, user });
};

const recipesById = async (req, res) => {
  const { user } = req;
  const recipesId = await recipeModel.getRecipesById();
  return res.render('detailsRecipes', { recipesId, user });
};

const findRecipes = async (req, res) => {
  const { q } = req.query; const { user } = req;
  if (!q) return res.render('searchRecipes', { searchRecipe: [], user });
  const searchRecipe = await recipeModel.getRecipesByQuery(q);
  return res.render('searchRecipes', { searchRecipe, user });
};

const createForm = (req, res) => res.render('createRecipes', { message: null, user: req.user });

const createRecipes = async (req, res) => {
  const { body, user } = req;
  try {
    const recipe = await recipeModel.postRecipes(body, user);
    res.render('createRecipes', { recipe, message: 'Receita cadastrada com sucesso' });
  } catch (err) {
    console.error(err);
  }
};

const editRecipe = async (req, res) => {
  const idRecipe = req.params.id;
  const { user } = req;

  const recipe = await recipeModel.getRecipesById(idRecipe, user);
  const recipeEdit = await recipeModel.editRecipesBank(idRecipe);

  if (idRecipe) return res.redirect('/');

  return res.render('editRecipes', { recipeEdit, message: 'Receita editada!' });
};

const deleteRecipeForm = async (req, res) => {
  const idUser = req.user.id;
  const recipesId = await recipesById();
  res.render('deleteRecipe', { idUser, message: null, recipesId: idUser });
};

const deleteRecipe = async (req, res) => {
  const idUser = req.user.id;
  const userId = req.params.id;
  const passwordInput = req.body.password;
  // const [id] = await recipeModel.getRecipesById();
  // const recipeId = id.id;
  // console.log('idrecipe',recipeId)
  const recipesId = await recipeModel.getRecipesById();
  console.log('aqui', recipesId);

  const [passwordBank] = await recipeModel.getPasswordToDelete(idUser);
  console.log('bank', passwordBank === passwordInput);

  try {
    if (passwordInput !== passwordBank) return res.render('deleteRecipe', { idUser, message: 'Senha Incorreta', recipesId: userId });
    if (passwordInput === passwordBank) {
      await recipeModel.deleteRecipeBank(recipesId.id);
      return res.redirect('/');
    }
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = {
  recipes,
  recipesById,
  findRecipes,
  createRecipes,
  createForm,
  editRecipe,
  deleteRecipe,
  deleteRecipeForm,
};
