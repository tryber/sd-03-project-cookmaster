const deleteModel = require('../models/deleteModel');

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const dbPassword = await deleteModel.getPasswordForDelete(req.user.id);

  if (req.body.password === dbPassword.password) {
    await deleteModel.deleteRecipe(id);
    // return res.render('deleteRecipe', { message: 'Receita deletada com sucesso', id, user })
    return res.redirect('/');
  }

  return res.render('deleteRecipe', { message: 'Senha incorreta.', id, user });
};

const deleteRecipePage = (req, res) => {
  const user = req.user;
  const { id } = req.params;
  return res.render('deleteRecipe', { message: null, id, user });
};

module.exports = {
  deleteRecipe,
  deleteRecipePage,
};
