const { findById } = require('../../models');
const { deleteRecipeModel } = require('../../models');

const deleteRecipe = async (req, res) => {
  const { id } = req.user;
  const { password: senha } = req.body;
  const { password } = await findById(id);

  if (password !== senha) {
    res.render('admin/delete', { message: 'Senha Incorreta.', user: req.user, id: req.params.id });
  }

  await deleteRecipeModel(req.params.id);

  return res.redirect('/');
};

module.exports = deleteRecipe;
