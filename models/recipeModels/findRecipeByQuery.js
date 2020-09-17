const { connect } = require('../connect');

const findRecipesByQuery = async (input) =>
  await connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['name', 'user', 'id'])
        .where('name like :input')
        .bind('input', `%${input}%`)
        .execute(),
    )
    .then(async (results) => await results.fetchAll())
    .then(async (recipes) => await recipes.map(([name, user, id]) => ({ name, user, id })))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = findRecipesByQuery;
