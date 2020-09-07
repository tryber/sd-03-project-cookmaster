const queryModel = require('../models/queryModel');

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
  const filteredRecipes = await queryModel.findRecipeByQuery(q);
  return res.render('search', { filteredRecipes, user });
};

module.exports = {
  getRecipe,
  getRecipes,
  searchRecipes,
};
