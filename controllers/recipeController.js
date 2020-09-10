const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const recipeList = async (req, res) => {
  const recipes = await recipeModel.getRecipeList();

  return res.render('home', { recipes, token: req.user });
};

const myRecipeList = async (req, res) => {
  const recipes = await recipeModel.getRecipeListById(req.user.id);

  return res.render('my', { recipes });
};

const recipeDetail = async (req, res) => {
  const recipeById = await recipeModel.getRecipeById(req.params.id);
  const recipeId = parseInt(req.params.id, 10);
  const { userId } = recipeById;
  const recipeUser = await userModel.findById(userId);
  return res.render('detail', {
    recipeById,
    token: (req.user && recipeUser.id[0] === parseInt(req.user.id, 10)),
    recipeUser,
    recipeId,
  });
};

const recipeSearch = async (req, res) => {
  const { query } = req.query;

  if (!query) return res.render('search', { recipeBySearch: null, token: req.user, query });

  const recipeBySearch = await recipeModel.getRecipeBySearch(query);

  return res.render('search', {
    recipeBySearch,
    query,
    token: req.user,
  });
};

let ingredientsList = [];

const recipeForm = async (req, res) => {
  ingredientsList = [];
  const {
    id,
    email,
    userName,
    lastName,
  } = req.user;

  return res.render('new', {
    user: {
      id,
      email,
      userName,
      lastName,
    },
    body: null,
    ingredientsList: null,
    deleteIngredient: null,
    save: null,
  });
};

const recipeRegister = async (req, res) => {
  const { id, email, userName, lastName } = req.user;
  const ownerUser = `${id[3]} ${id[4]}`;
  const { recipeName, ingredients, instructions, deleteIngredient, save } = req.body;

  if (ingredients.length > 0) {
    ingredientsList.push(ingredients);
  } else if (deleteIngredient) {
    ingredientsList.splice(deleteIngredient, 1);
  }

  if (save && ingredients.length > 0) {
    await recipeModel.insertRecipe(id, ownerUser, recipeName, ingredientsList.join(), instructions);
    const recipes = await recipeModel.getRecipeList();

    return res.render('home', { recipes, token: req.user });
  }

  return res.render('new', {
    body: { recipeName, ingredients, instructions },
    user: { id, email, userName, lastName },
    ingredientsList,
    deleteIngredient,
    save,
    ownerUser,
  });
};

const deleteForm = async (req, res) => {
  const rcpId = req.params.id;
  return res.render('delete', {
    message: null,
    rcpId,
    id: null,
    password: null,
    idUser: null,
  });
};

const recipeDelete = async (req, res) => {
  const { password } = req.body;
  const idUser = req.user;
  const { id } = req.params;

  if (idUser.id[2] !== password) {
    return res.render('delete', {
      message: 'Senha Incorreta.',
      id,
      idUser: idUser.id[2],
      password,
      rcpId: null,
    });
  }

  await recipeModel.deleteRecipe(id);

  const recipes = await recipeModel.getRecipeList();
  return res.render('home', { recipes, token: req.user });
};

module.exports = {
  recipeList,
  myRecipeList,
  recipeDetail,
  recipeSearch,
  recipeForm,
  recipeRegister,
  deleteForm,
  recipeDelete,
};
