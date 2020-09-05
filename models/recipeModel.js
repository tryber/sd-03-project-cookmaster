// Código baseado no exemplo de MVC da aula 27.2.

const connection = require('./connection');

// Joga do banco para a aplicação
const getAllRecipes = async () =>
  connection()
    .then((data) => data
      .getTable('recipes')
      .select(['id', 'name', 'user'])
      .execute())
      .then((results) => results.fetchAll()) // Consome o resultado da promise
      .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));
      // O código acima retorna tudo num array. A última linha passa para objeto

/**
 * Busca uma receita através do seu ID
 * @param {string} id ID da receita
 */
const findById = async (id) =>
  connection()
    .then((data) =>
      data
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
  )
  .then((results) => results.fetchAll()[0])
  .then(([ recipeId, userID, user, name, ingredients, instructions ]) => 
  ({ id: recipeId, userID, user, name, ingredients, instructions })
);

/**
 * Busca uma receita através do seu nome
 * @param {string} name (parte do) título da receita
 */
const findByName = async (name) => {
  return connection()
    .then((data) => 
      data
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${name}%`)
        .execute(),
  )
  .then((results) => results.fetchAll())
  .then((recipesList) => {
    if (!recipesList) return null;
    return recipesList.map(([id, user_id, user, name]) => ({ id, user_id, user, name }));
  })
};

const addNew = ({userID, user, name, ingredients, instructions}) =>
  connection().then((data) => 
    data
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userID, user, name, ingredients, instructions)
      .execute()
  );

// const update = 


module.exports = {
  findById,
  getAllRecipes,
  findByName,
  addNew
};
