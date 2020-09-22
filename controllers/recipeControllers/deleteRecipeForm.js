const { findRecipeById } = require('../../models');

const deleteRecipeForm = async (req, res) => {
  const { id } = req.user;
  const { userId } = await findRecipeById(req.params.id);

  if (userId !== id) res.redirect('/');

  return res.render('admin/delete', { message: null, user: req.user, id: req.params.id });
};

module.exports = deleteRecipeForm;
