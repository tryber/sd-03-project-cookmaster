const {
  getAllRecipes,
  getRecipeById,
  insertRecipe,
  updateRecipe,
  deleteRecipe,
  getByUserId,
} = require('../models/recipeModel');
const { findById } = require('../models/userModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getRecipe = async (req, res) => {
  try {
    const {
      params: { id },
      user,
    } = req;
    const recipe = await getRecipeById(id);
    if (user) return res.render('recipes/id', { recipe, user });
    return res.render('recipes/id', { recipe, user: null });
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const postRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const id = await insertRecipe(name, req.user.name, ingredients, instructions, req.user.id);
  // const recipe = await getRecipeById(id)
  // return res.redirect(`/recipes/${id}`);
  const recipes = await getAllRecipes();
  return res.render('home', { user: req.user, message: 'Receita Cadastrada com Sucesso', recipes });
};

const getUpdate = async (req, res) => {
  const { user, params } = req;
  const recipe = await getRecipeById(params.id);
  if (user.id !== recipe.user_id) {
    return res.render('recipes/id', { recipe, user });
  }
  return res.render('recipes/edit', { recipe, user });
};

const postUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;

  await updateRecipe(id, name, ingredients, instructions);
  return res.redirect('/');
  // return res.render('recipes/edit', { recipe, user: req.user });
};

const confirmDelete = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (recipe.user_id !== req.user.id) return res.render('recipes/id', { user: req.user, recipe });
  console.log('recipe:', recipe);
  return res.render('recipes/delete', { message: null, user: req.user, id });
};

const deleteRecip = async (req, res) => {
  const { id } = req.params;
  const { user, body } = req;
  const { password } = await findById(user.id);

  if (body.password === password.toString()) {
    await deleteRecipe(id);
    const recipes = await getAllRecipes();
    return res.render('home', { user, recipes });
  }
  return res.render('recipes/delete', { message: 'Senha Incorreta.', id, user: req.user });
};

const getRecipesByUserId = async (req, res) => {
  const { id } = req.user;
  const recipes = await getByUserId(id);
  return res.render('me/recipes', { recipes, user: req.user });
};

module.exports = {
  listRecipes,
  getRecipe,
  postRecipe,
  getUpdate,
  postUpdate,
  deleteRecip,
  confirmDelete,
  getRecipesByUserId,
};
