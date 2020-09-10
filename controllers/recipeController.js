const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const recipeList = async (req, res) => {
  const recipes = await recipeModel.getRecipeList();

  return res.render('home', { recipes, token: req.user });
};

const myRecipeList = async (req, res) => {
  const recipes = await recipeModel.getRecipeListById(parseInt(req.user.id, 10));

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

const recipeUpdateForm = async (req, res) => {
  const recipe = await recipeModel.getRecipeById(req.params.id);

  return res.render('update', {
    recipe,
    newList: null,
    recipeName: null,
    ingredients: null,
    instructions: null,
    ingredientsList: null,
    deleteIngredient: null,
    save: null,
    listWithDelete: null,
  });
};

const recipeUpdate = async (req, res) => {
  let newList = null;
  const { recipeName, ingredients, instructions, deleteIngredient, save } = req.body;
  let recipe = await recipeModel.getRecipeById(req.params.id);
  newList = recipe.ingredients;
  const listWithDelete = newList.split(',');
  if (ingredients.length > 0) {
    listWithDelete.push(ingredients);
    newList = `${listWithDelete.join()}`;
  } else if (deleteIngredient) {
    listWithDelete.splice(deleteIngredient, 1);
    newList = `${listWithDelete.join()}`;
  }
  await recipeModel.updateRecipe(req.params.id, recipeName, newList, instructions);
  recipe = await recipeModel.getRecipeById(req.params.id);
  if (deleteIngredient || ingredients.length > 0) {
    return res.render('update', {
      recipe,
      recipeName,
      ingredients,
      instructions,
      ingredientsList,
      deleteIngredient,
      save,
      newList,
      listWithDelete,
    });
  }
  return res.redirect('/');
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
  recipeUpdateForm,
  recipeUpdate,
  deleteForm,
  recipeDelete,
};
