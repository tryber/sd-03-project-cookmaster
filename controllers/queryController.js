const queryModel = require('../models/queryModel');
const userModel = require('../models/userModel');

const getRecipes = async (req, res) => {
  const user = req.user;
  const recipes = await queryModel.getAllRecipes();
  const filteredRecipes = recipes.reduce((acc, cur) => {
    acc = [...acc, {
      id: cur[0],
      user_id: cur[1],
      user: cur[2],
      name: cur[3],
      ingredients: cur[4],
    }];
    return acc;
  }, []);
  return res.render('home', {
    filteredRecipes, user, message: null,
  });
};

const getRecipe = async (req, res) => {
  const user = req.user;
  const recipe = await queryModel.getRecipeById(req.params.id);
  recipe.ingredients = recipe.ingredients.split(',');
  return res.render('recipe', { recipe, user });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;
  const user = req.user;
  const filteredRecipes = await queryModel.getRecipeByQuery(q);
  return res.render('search', { filteredRecipes, user });
};

const getUserRecipes = async (req, res) => {
  const user = req.user;
  const recipes = await queryModel.getRecipeByUserId(user.id);
  return res.render('admin/myRecipes', { recipes });
};

const newRecipeForm = (_req, res) => res.render('admin/newRecipe', { message: null });

const newRecipe = async (req, res) => {
  const { body, user } = req;
  const recipe = await queryModel.createRecipe(body, user);
  if (recipe.error) {
    return res.render('admin/newRecipe', { message: recipe.message });
  }
  return res.redirect('/');
};

const forms = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const recipe = await queryModel.getRecipeById(id);

  if (recipe.userId === user.id) {
    return res.render(req.going, { message: null, id, recipe });
  }
  return res.redirect('/');
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { pass } = req.body;
  const user = req.user;
  const dbUser = await userModel.findById(user.id);
  if (pass !== dbUser.password) {
    return res.render('admin/deleteForm', { message: 'Senha Incorreta.', id });
  }
  await queryModel.deleteRecipe(id);
  return res.redirect('/');
};


module.exports = {
  forms,
  deleteRecipe,
  getRecipe,
  getRecipes,
  getUserRecipes,
  newRecipe,
  newRecipeForm,
  searchRecipes,
};
