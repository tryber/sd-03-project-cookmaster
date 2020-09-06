const { recipeDetails, userModel } = require('../models');

const reciveExcludeForm = async (req, res) => {
  const { id } = req.params;
  return res.render('recipes/exclude', { id, user: req.user, message: null });
};

const excludeForm = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  const userID = req.user.id;
  const userPassword = await (await userModel.findById(userID)).password;
 
  if(userPassword !== password) 
  return res.render(`recipes/exclude`, {
    id,
    user: req.user,
    message: 'Senha Incorreta.',
    redirect: null,
  });

  await recipeDetails.excludeRecipe(id);

  res.redirect("/");
};

module.exports = {
  reciveExcludeForm,
  excludeForm,
};
