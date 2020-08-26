const recipeModel = require('../models/recipeModel');
const express = require('express');
const middlewares = require('../middlewares');
const userModel = require('../models/userModel');

const router = express.Router();

router.get('/search', middlewares.auth(false), async (req, res) => {
  const toSearch = req.query.q;
  const recipesLike = await recipeModel.getRecipeLike(toSearch) || [];

  res.render('recipes/search', { recipesLike, user: req.user });
});

router.get('/new', middlewares.auth(true), async (_req, res) => {
  res.render('recipes/newRecipe', { error: '', message: '' });
});

router.post('/', middlewares.auth(true), async (req, res) => {
  const { id } = await recipeModel.createRecipe(req.body, req.user.id);
  res.redirect(`recipes/${id}`);
});

router.get('/:id', middlewares.auth(false), async (req, res) => {
  const recipe = await recipeModel.getRecipe(req.params.id);
  if (!recipe) return res.redirect('/');
  const user = req.user || {};
  res.render('recipes/details', { recipe, user, recipeId: req.params.id });
  return;
});

router.get('/:id/edit', middlewares.auth(true), async (req, res) => {
  const recipeRequest = await recipeModel.getRecipe(req.params.id);
  if (!recipeRequest) return res.redirect('/');
  const { title, ingredients, detailsRecipe, idUser } = recipeRequest;
  if (req.user.id !== idUser) return res.redirect('/');
  res.render('recipes/editRecipe', {
    title,
    ingredients,
    detailsRecipe,
    id: req.params.id,
  });
  return;
});

router.post('/:id', middlewares.auth(true), async ({ body, params: { id }, user }, res) => {
  const recipe = {
    title: body.title,
    ingredients: body.ingredients,
    detailsRecipe: body.detailsRecipe,
    idUser: id,
  };
  try {
    await recipeModel.updateRecipe(recipe);
    res.render('recipes/details', { user, recipe });
  } catch (err) {
    res.send(err.code);
  }
});

router.get('/:id/delete', middlewares.auth(true), async (req, res) => {
  const recipeRequest = await recipeModel.getRecipe(req.params.id);

  if (!recipeRequest) return res.redirect('/');

  const { idUser } = recipeRequest;

  const { id } = req.user;

  if (id !== idUser) return res.redirect('/');

  return res.render('delete/delete', { wrongPass: false, id: req.params.id });
});

router.post('/:id/delete', middlewares.auth(true), async ({ body, user, params }, res) => {
  const { password } = body;
  const { id } = user;
  const userData = await userModel.findBy(id, 'id');

  if (password !== userData.password) {
    return res.render('delete/delete', {
      wrongPass: true,
      id: params.id,
    });
  }

  await recipeModel.deleteRecipe(params.id);

  return res.redirect('/');
});

module.exports = {
  router,
};
