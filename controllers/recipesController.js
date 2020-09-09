const recipesModel = require('../models/recipesModel');

const recipesRender = async(_req, res) => {
  return res.render('/', recipesModel);
};

module.exports = {
  recipesRender,
};
