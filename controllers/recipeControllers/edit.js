const { editRecipe } = require('../../models');

const edit = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;

  await editRecipe(req.params.id, recipeName, ingredients, instructions);

  return res.redirect('/me/recipes');
};

module.exports = edit;
