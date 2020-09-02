const queryModel = require('../models/queryModel');

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

  return res.render('home', {
    filteredRecipes, isAuth: req.user, message: null,
  });
};

const getRecipe = async (req, res) => {
  //do something
  console.log(req.params);
};

module.exports = {
  getRecipe,
  getRecipes,
};
