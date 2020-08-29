const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  try {
    /* baseado em orientação do instrutor Roz
    durante plantão dia 26/08 */
    const recipes = await recipesModel.findAllRecipes();
    if (req.user) return res.render('home', { recipes, user: req.user });
    return res.render('home', { recipes, user: null });
  } catch (error) {
    return error;
  }
};

const listRecipeByID = (req, res) => {
  const { recipeDetails, user } = req;

  if (recipeDetails && user) {
    return res.render('recipes/details', { recipeDetails, user });
  }
  return res.render('recipes/details', { recipeDetails, user: null });
};

const listRecipeForUpdateByID = (req, res) => {
  const { recipeDetails, user } = req;

  return res.render('recipes/updateRecipe', { recipeDetails, user });
};

const listRecipesByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const { user } = req;
    const searchedRecipes = await recipesModel.searchRecipes(q);

    if (user) return res.render('recipes/search', { recipes: searchedRecipes, user });

    return res.render('recipes/search', { recipes: searchedRecipes, user: null });
  } catch (error) {
    return error;
  }
};

const registryRecipe = async (req, res) => {
  const { id, name: userName } = req.user;
  const { name, ingredients, instructions } = req.body;
  try {
    if (req.body) {
      await recipesModel.createRecipe(id, userName, name, ingredients, instructions);
      return res.redirect('/');
    }
    return res.render('recipes/newRecipe', {
      message: 'Campos inválido',
    });
  } catch (error) {
    return error;
  }
};

const updateRecipe = async (req, res) => {
  const { user, params, body } = req;
  const { id } = params;
  const { name, ingredients, instructions } = body;

  // Para comparação de id de usuário logado com autor da receita
  const checkRecipe = await recipesModel.findRecipeByID(id);
  try {
    if (body && checkRecipe.userId === user.id) {
      await recipesModel.updateRecipe(id, name, ingredients, instructions);
      return res.redirect('/');
    }
    return res.status(401).send('Acesso Negado');
  } catch (error) {
    return error;
  }
};

const deleteRecipe = async (req, res) => {
  const {
    user, params, body, validatePassword,
  } = req;
  const { id } = params;

  try {
    if (user && body.password && validatePassword) {
      await recipesModel.deleteRecipe(id);
      return res.redirect('/');
    }
    if (user && body.password && !validatePassword) {
      return res.render('recipes/delete', { recipeId: id, message: 'Senha Incorreta.' });
    }
    return res.status(401).send('Acesso Negado');
  } catch (error) {
    return error;
  }
};

const userRecipes = async (req, res) => {
  const { user } = req;
  const { id } = user;
  try {
    const recipes = await recipesModel.findAllRecipesByUserID(id);
    return res.render('recipes/userRecipes', { recipes, user });
  } catch (error) {
    return error;
  }
};

module.exports = {
  listRecipes,
  listRecipeByID,
  listRecipeForUpdateByID,
  listRecipesByQuery,
  registryRecipe,
  updateRecipe,
  deleteRecipe,
  userRecipes,
};
