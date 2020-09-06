const connect = require('./connect');

const findRecipes = async () => {
  return connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(["id", "user", "name"])
        .execute()
    )
    .then((results) => 
      results.fetchAll()
    )
    .then((results) => 
      results.map(([id, user, name]) => (
      {
        id,
        user,
        name,
      }
    )))
};

module.exports = {
  findRecipes,
};
