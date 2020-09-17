const { createNewRecipe } = require('../../models');

const newRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { name, lastName, id } = req.user;
  const userFullName = `${name} ${lastName}`;

  await createNewRecipe(id, userFullName, recipeName, ingredients, instructions);

  return res.redirect('/');
};

module.exports = newRecipe;
