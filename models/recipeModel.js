const connect = require('./connect');

const getRecipesNamesAndAuthors = async () =>
  connect()
    .then((db) => console.log(db.getTable('recipes')) && db.getTable('recipes'))
    .select(['user', 'name']).execute()
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([user, name]) => ({ user, name })));

module.exports = {getRecipesNamesAndAuthors};
