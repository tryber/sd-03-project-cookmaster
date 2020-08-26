const { connection, connectionSession } = require('./connections');

const queryUser = `SELECT
re.id, re.name, CONCAT(us.first_name, ' ', us.last_name)
FROM recipes AS re
INNER JOIN users AS us ON us.id = re.user_id;`;

const getNames = async () =>
  connectionSession(queryUser)
    .then((query) =>
      query
        .execute()
        .then((results) => results.fetchAll())
        .then((recipes) =>
          recipes.map(
            ([id, recipe, userName]) =>
              ({ id, recipe, userName }),
          )));

const queryRecipe = `SELECT
fs.name, fs.ingredients, fs.instructions, CONCAT(us.first_name, ' ', us.last_name), us.id
FROM (SELECT name, ingredients, instructions, user_id
FROM recipes
WHERE id = ?) AS fs
INNER JOIN users AS us ON fs.user_id = us.id;`;

const getRecipe = async (id) =>
  connection().then((session) =>
    session.sql(queryRecipe)
      .bind(id)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then((response) => {
      if (!response) return null;
      const [title, ingredients, detailsRecipe, userName, idUser] = response;
      return ({ title, ingredients, detailsRecipe, userName, idUser });
    },
    );

const insertRecipe = async ({ title, ing, ins, id }) =>
  connection()
    .then((db) =>
      db
        .getSchema('cookmaster')
        .getTable('recipes')
        .insert(['name', 'ingredients', 'instructions', 'user_id'])
        .values([title, ing, ins, id])
        .execute(),
    );

const createRecipe = async ({ title, ingredients, detailsRecipe }, user) => {
  if (!title || !ingredients || !detailsRecipe) return { message: 'Preencha todos os campos.' };
  const toInsert = { title, ing: ingredients, ins: detailsRecipe, id: user };
  const id = await insertRecipe(toInsert)
    .then((result) => result.getAutoIncrementValue());
  return { message: 'Receita cadastrada.', id };
};

const updateQuery = `UPDATE recipes
SET name = ?, ingredients = ?, instructions = ?
WHERE id = ?;`;

const updateRecipe = async ({ title, ingredients, detailsRecipe, idUser }) =>
  connectionSession(updateQuery)
    .then((query) =>
      query
        .bind(title)
        .bind(ingredients)
        .bind(detailsRecipe)
        .bind(idUser)
        .execute());

const deleteRecipeQuery = 'DELETE from recipes WHERE id = ?';

const deleteRecipe = async (recipeId) =>
  connection()
    .then((session) =>
      session
        .sql(deleteRecipeQuery)
        .bind(recipeId)
        .execute());

const recipeLike = `SELECT
re.id, re.name, CONCAT(us.first_name, ' ', us.last_name) FROM recipes as re
INNER JOIN users as us on us.id = re.user_id
WHERE re.name LIKE ?;`;

const getRecipeLike = async (string) => {
  const likeWord = `%${string}%`;
  return connectionSession(recipeLike)
    .then((query) =>
      query
        .bind(likeWord)
        .execute()
        .then((results) => results.fetchAll())
        .then((recipes) => recipes
          .map(([id, title, user]) => ({ id, title, user }))),
    );
};

const getUserRecipesQuery = `SELECT
re.id,
re.name,
CONCAT(us.first_name, ' ', us.last_name)
FROM recipes as re
INNER JOIN users as us on us.id = re.user_id
WHERE re.user_id = ?;`;

const getUserRecipes = (id) =>
  connection()
    .then((session) =>
      session
        .sql(getUserRecipesQuery)
        .bind(id)
        .execute()
        .then((results) => results.fetchAll())
        .then((recipes) => recipes
          .map(([userId, title, user]) => ({ id: userId, title, user })),
        ));

module.exports = {
  getNames,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeLike,
  getUserRecipes,
};
