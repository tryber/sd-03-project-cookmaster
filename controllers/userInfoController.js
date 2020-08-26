const express = require('express');
const middlewares = require('../middlewares');
const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const router = express.Router();

router.get('/recipes', middlewares.auth(true), async (req, res) => {
  const { id } = req.user;
  const userRecipes = await recipeModel.getUserRecipes(id);

  res.render('user/recipes', { userRecipes, user: req.user });
});

router.get('/edit', middlewares.auth(true), async ({ user }, res) => {
  res.render('user/edit', { user });
});

router.post('/', middlewares.auth(true), async ({ body, user }, res) => {
  const { name, lastName, email } = body;
  const { id } = user;
  const toUpdate = { email, name, lastName, id };

  await userModel.updateUser(toUpdate);

  res.redirect('/');
});

module.exports = {
  router,
};
