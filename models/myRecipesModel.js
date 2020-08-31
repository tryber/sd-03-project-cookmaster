const connect = require('./connect');

const getAllMyRecipes = async (userId) => {
  const db = await connect();
  const results = await db.getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('user_id = :userId')
    .bind('userId', userId)
    .execute()

  const recipes = await results.fetchAll();

  const recipesArr = recipes.map(([ id, user, name ]) => ({ id, user, name }));
  return recipesArr;
}


module.exports = {
  getAllMyRecipes,
};
