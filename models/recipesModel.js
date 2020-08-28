const db = require('./DbConnection');


const listRecipes = async () => (
  db()
  .then((data) => data.getTable('recipes').select(['name', 'user']).execute()
    .then((results) => results.fetchAll())
    .then((listData) => listData.map(([name, user]) => ({ name, user }))),
  )
);


module.exports = {
  listRecipes,
};
