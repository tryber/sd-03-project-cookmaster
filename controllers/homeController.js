const homeModel = require('../models/homeModel');

const listRecipes = async (_req, res) => {
  const recipes = await homeModel.getAll();
  console.log(recipes);

  res.render('home', { recipes });
  // try {
  //   /* baseado em orientação do instrutor Roz
  //   durante plantão dia 26/08 */
  //   const recipes = await homeModel.getAllRecipes();
  //   if (req.user) return res.render('home', { recipes, user: req.user });
  //   return res.render('home', { recipes, user: null });
  // } catch (error) {
  //   return error;
  // }
};

module.exports = {
  listRecipes,
};
