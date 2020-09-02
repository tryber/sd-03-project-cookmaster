const queryModel = require('../models/queryModel');
const { query } = require('express');

const getRecipes = async (req, res) => {
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
  console.log(filteredRecipes)
  return res.render('home', {
    filteredRecipes, isAuth: req.user, message: null,
  });
};

const getRecipe = async (req, res) => {
  const recipe = await queryModel.getRecipeById(req.params.id);
  console.log(recipe);
  return res.render('recipe', { recipe, isAuth: false });
};

module.exports = {
  getRecipe,
  getRecipes,
};
