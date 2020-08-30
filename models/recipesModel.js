const connection = require('./connection');

const findAllRecipes = async () =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const findRecipeById = async (recipeid) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'ingredients', 'instructions', 'id', 'user_id'])
      .where('id = :recipeid')
      .bind('recipeid', recipeid)
      .execute())
    .then((results) => results.fetchOne())
    .then(([name, user, ingredients, instructions, id, userId]) =>
      ({ name, user, ingredients, instructions, id, userId }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const findRecipeByName = async (input) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .where('name like :input')
      .bind('input', `%${input}%`)
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const createRecipe = ({ userId, user, name, ingredients, instructions }) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const attRecipe = async ({ name, ingredients, instructions }, id) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });


const invalidRecipe = ({ name, ingredients, instructions }) => {
  if (!name || !ingredients || !instructions) return true;
  return false;
};

const verifyUser = (userId, id) => (userId === id ? 1 : 0);

const findAllRecipesByUserId = (userId) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select(['name', 'user', 'id'])
      .where('user_id = :userId')
      .bind('userId', userId)
      .execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })));

const findPasswordById = async (inputId) =>
  connection()
    .then((db) => db
      .getTable('users')
      .select(['password'])
      .where('id = :inputId')
      .bind('inputId', inputId)
      .execute())
    .then((result) => result.fetchOne())
    .then(([password]) => (
      { password }
    ));

const verifyPassword = async (passwordInput, userId) => {
  const { password } = await findPasswordById(userId);
  console.log(password, passwordInput);
  if (passwordInput === password ) {
    return true;
  }
  console.log(false);
  return false;
}

const deleteRecipeById = (recipeId) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .delete()
      .where('id = :recipeId')
      .bind('recipeId', recipeId)
      .execute());


module.exports = {
  findAllRecipes,
  findRecipeById,
  findRecipeByName,
  createRecipe,
  invalidRecipe,
  verifyUser,
  attRecipe,
  findAllRecipesByUserId,
  deleteRecipeById,
  verifyPassword,
};
