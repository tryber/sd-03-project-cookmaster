const connect = require('../models/connection');

const getAllRecipes = async () =>
  connect().then((db) => db
    .getTable('recipes')
    .select()
    .execute()
    ).then((results) => results.fetchAll())

module.exports = {
  getAllRecipes,
};
