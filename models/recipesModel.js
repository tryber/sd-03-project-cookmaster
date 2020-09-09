const connection = require('./connection');

const recipes = async () => {
 return await connection()
    .then((db) =>
      db
      .getTable("recipes")
      .select()
      .execute()
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes);
};

module.exports = {
  recipes
};
