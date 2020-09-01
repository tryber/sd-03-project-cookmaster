const detailsModel = require('../models/detailsModel');

const recipe = async (req, res) => {
  const { id } = req.params;

  const recipeDetails = await detailsModel.getDetails(id);

  const user = req.user;

  const userControl = req.user && recipeDetails.userId === req.user.id;

  res.render('details', { recipeDetails, userControl, user });
};

module.exports = {
  recipe,
};
