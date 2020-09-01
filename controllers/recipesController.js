const recipeModel = require('../models/recipeModel');

const recipes = async (req, res) => {
  const { user } = req;
  const listRecipes = await recipeModel.getRecipes();
  // if (!user) return res.render('home', { listRecipes, user: null })
  return res.render('home', { listRecipes, user });
};

const recipesById = async (req, res) => {
  const { user } = req;
  const recipesId = await recipeModel.getRecipesById(req.params.id);

  const [id] = await recipesId;

  return res.render('detailsRecipes', { recipesId, user, id });
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
    return res.render('createRecipes', { recipe, message: 'Receita cadastrada com sucesso', id: 1 });
  } catch (err) {
    console.error(err);
  }
};

const editRecipe = async (req, res) => {
  const idRecipe = req.params.id;
  // const { user } = req;

  // const recipe = await recipeModel.getRecipesById(idRecipe, user);
  const recipeEdit = await recipeModel.editRecipesBank(idRecipe);

  if (idRecipe) return res.redirect('/');

  return res.render('editRecipes', { recipeEdit, message: 'Receita editada!' });
};

const deleteRecipeForm = async (req, res) => {
  // const { id } = req.user;
  // const recipesId = await recipesById();
  res.render('deleteRecipe', { id: req.params.id, message: null, user: req.user });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.user;
  const passwordInput = req.body.password;

  // const recipesId = await recipeModel.getRecipesById();
  const [passwordBank] = await recipeModel.getPasswordToDelete(id);

  try {
    if (passwordInput !== passwordBank) return res.render('deleteRecipe', { id: req.params.id, message: 'Senha Incorreta.', user: req.user });
    if (passwordInput === passwordBank) {
      await recipeModel.deleteRecipeBank(req.params.id);
      return res.redirect('/');
    }
  } catch (err) {
    return console.error(err);
  }
};

const yourRecipes = async (req, res) => {
  const { user } = req;
  const { id } = user;

  try {
    const allRecipes = await recipeModel.findAllRecipesById(id);
    return res.render('yourRecipes', { allRecipes, user });
  } catch(e) {
    return console.error(e);
  }
}

module.exports = {
  recipes,
  recipesById,
  findRecipes,
  createRecipes,
  createForm,
  editRecipe,
  deleteRecipe,
  deleteRecipeForm,
  yourRecipes,
};
