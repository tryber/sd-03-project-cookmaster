const cookModel = require('../models/cookModel');
const userModel = require('../models/userModel');

const listCook = async (req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('home', { recipes, user: req.user });
};

const searchRecipe = async (req, res) => {
  let recipes;
  recipes = await (cookModel.getAll());
  if (req.query.search === undefined) {
    return res.render('searchRecipes', { user: req.user, recipes });
  }

  const test = [await cookModel.getCookieByName(req.query.search)];
  recipes = test;
  return res.render('searchRecipes', { user: req.user, recipes });
};

let lala = [];

const newRecipe = (req, res) => {
  lala = [];
  res.render('admin/newRecipe', { lala, name: '', user: req.user });
};

const setNewRecipe = async (req, res) => {
  const { remove, name, ingredient, instructions, save } = req.body;
  if (remove !== undefined) {
    lala.splice(remove, 1);
    return res.render('admin/newRecipe', { lala: [], name, user: req.user });
  }
  if (save !== undefined && name.length > 0 && lala.length > 0 && instructions.length > 0) {
    const ing = lala.join(',');
    await cookModel.setNewRecipes(req.body, req.user, ing);
    const recipes = await cookModel.getAll();
    return res.render('admin/home', { user: req.user, recipes });
  }
  if (remove === undefined && ingredient.length > 0) {
    lala.push(ingredient);
  }
  return res.render('admin/newRecipe', { lala, name, user: req.user });
};

const cooks = async (req, res) => {
  const { id } = req.params;
  const recipesDetails = await cookModel.getCookieById(id);
  return res.render('recipes', { user: req.user, recipesDetails, id });
};

const admin = async (req, res) => {
  const recipes = await cookModel.getAll();
  return res.render('admin/home', { user: req.user, recipes });
};

const recipeToEdit = async (req, res) => {
  const { id } = req.params;
  const recipesDetails = await cookModel.getCookieById(id);
  if (recipesDetails.userId !== req.user.id) {
    return res.redirect(`/recipes/${id}`);
  }
  return res.render('recipesEdit', { user: req.user, recipesDetails });
};

let newInggg = [];

const editRecipe = async (req, res) => {
  const { ingredients, add, remove } = req.body;
  const { id } = req.params;
  let recipesDetails = await cookModel.getCookieById(id);
  if (add !== undefined && ingredients.length > 0) {
    newInggg = [recipesDetails.ingredients, ingredients];
    await cookModel.changeRecipe(req.body, id, newInggg.join(','));
    recipesDetails = await cookModel.getCookieById(id);
    newInggg = [];
    return res.render('recipesEdit', { user: req.user, recipesDetails });
  }
  if (remove !== undefined) {
    newInggg.push(recipesDetails.ingredients);
    const s = newInggg[0].split(',');
    s.splice(Number(remove), 1);
    await cookModel.changeRecipe(req.body, id, s.join(','));
    recipesDetails = await cookModel.getCookieById(id);
    newInggg = [];
    return res.render('recipesEdit', { user: req.user, recipesDetails });
  }
  return res.render('recipes', { user: req.user, recipesDetails, id });
};

const recipeToDelete = async (req, res) => {
  const { id } = req.params;
  const recipesDetails = await cookModel.getCookieById(id);
  if (recipesDetails.userId !== req.user.id) {
    return res.redirect(`/recipes/${id}`);
  }
  return res.render('recipesDelete', { user: req.user, recipesDetails, message: null });
};

const deleteRecipe = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const recipesDetails = await cookModel.getCookieById(id);
  const user = await userModel.findByValue(req.user.id, 'id');
  console.log(user.password)
  if (password !== user.password) {
    return res.render('recipesDelete', { user: req.user, recipesDetails, id, message: 'Senha Incorreta.' });
  }
  await cookModel.deleteCookie(id);
  const recipes = await cookModel.getAll();
  return res.render('admin/home', { user: req.user, recipes, id });
};

module.exports = {
  listCook,
  newRecipe,
  cooks,
  admin,
  setNewRecipe,
  searchRecipe,
  recipeToEdit,
  editRecipe,
  recipeToDelete,
  deleteRecipe,
};
