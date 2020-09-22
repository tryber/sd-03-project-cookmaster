const { getAll } = require('../../models');

const list = async (req, res) => {
  const recipes = await getAll();

  return res.render('home', { recipes, user: req.user });
};

module.exports = list;
