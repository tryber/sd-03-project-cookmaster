const connect = require('./connect');

const getRecipeById = async(idSearched) => {
  const db = await connect();
  const result = await db.getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :idSearched')
    .bind('idSearched', idSearched)
    .execute()

  const details = await result.fetchAll()[0];
  console.log(details)
  const [id, userId, user, name, ingredientsStr, instructions] = details;

  const arrayOfIngredients = ingredientsStr.split(',')

  return { id, userId, user, name, ingredients: arrayOfIngredients, instructions };
};

const editRecipe = async(id, recipeName, ingred, instruc) => {
  const recipeId = parseInt(id);
  const db = await connect();
  await db.getTable('recipes')
    .update()
    .set('name', recipeName)
    .set('ingredients', ingred)
    .set('instructions', instruc)
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
    .execute()

  return true;
}

const canEdit = (userId, recipeUserId) => userId === recipeUserId ? true : false;

module.exports = {
  getRecipeById,
  editRecipe,
  canEdit,
};
