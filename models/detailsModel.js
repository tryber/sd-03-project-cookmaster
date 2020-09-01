const connect = require('./connect');

const getDetails = async (idSearched) => {
  const db = await connect();
  const result = await db.getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :idSearched')
    .bind('idSearched', idSearched)
    .execute();

  const details = await result.fetchAll()[0];
  const [id, userId, user, name, ingredientsStr, instructions] = details;

  const arrayOfIngredients = ingredientsStr.split(',');

  return { id, userId, user, name, ingredients: arrayOfIngredients, instructions };
};

module.exports = {
  getDetails,
};
