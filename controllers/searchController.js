const searchModel = require('../models/searchModel');


userControl = false
user = { lastName: 'Fagundes', firstName: 'Jafet' };

const search = async (req, res) => {
  const searchText = req.query.searchText;

  const user = req.user;

  if (searchText) {
    const recipes = await searchModel.getSearch(searchText);
    console.log(recipes)
    return res.render('search', { user, recipes })
  }
  return res.render('search', { user, recipes: false })
};

module.exports = {
  search,
};
