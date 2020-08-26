const recipeModel = require('../models/recipeModel');

const showResume = async (_req, res) => {
  const listResume = await recipeModel.resumeAllRecipes();
  return res.render('home', { listResume, message: null });
};

module.exports = {
  showResume,
};
