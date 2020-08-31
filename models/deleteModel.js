const connect = require('./connect');

const deleteRecipe = async (recipeId) => {
  const db = await connect();
  await db.getTable('recipes')
    .delete()
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
    .execute();

  return true;
}

const getPasswordForDelete = async (id) => {
  const db = await connect();
  const result = await db.getTable('users')
    .select(['password'])
    .where('id = :id')
    .bind('id', id)
    .execute()
  const passwordArr = result.fetchAll()[0];
  const [ password ] = passwordArr;
  return { password };
}

module.exports = {
  deleteRecipe,
  getPasswordForDelete,
};
