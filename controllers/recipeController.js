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
    if (req.body && checkRecipe.userId === user.id) {
      await recipesModel.updateRecipe(id, name, ingredients, instructions);
      return res.redirect(`/recipes/${id}`);
    }
    return res.status(401).send('Acesso Negado');
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
};
