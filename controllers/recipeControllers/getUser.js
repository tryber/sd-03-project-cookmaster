const { findRecipeByUserId } = require('../../models');

const getUser = async (req, res) => {
  const { id } = req.user;

  const recipes = await findRecipeByUserId(id);

  return res.render('admin/my-recipes', { recipes, user: req.user });
};

module.exports = getUser;
