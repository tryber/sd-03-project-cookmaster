const { connect } = require('../connect');

const findRecipesByQuery = async (input) =>
  connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['name', 'user', 'id'])
        .where('name like :input')
        .bind('input', `%${input}%`)
        .execute(),
    )
    .then(async (results) => results.fetchAll())
    .then(async (recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = findRecipesByQuery;
