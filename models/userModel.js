const connection = require('./connection');

const showAll = () => connection()
  .then((db) => db.getTable('recipes').select(['id', 'name', 'user']).execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));

const findByEmail = async (email) => {
  const userInfo = await connection()
    .then((db) => db.getTable('users')
      .select(['id', 'email', 'password'])
      .where('email = :email')
      .bind('email', email)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then((user) => user);
  const [id, mail, password] = userInfo;
  return { id, mail, password };
};

function checkmail(email) {
  if (!email || email.length < 5) return { message: 'O email deve ter o formato email@mail.com' };
  return true;
}

function checkpass(password, passConfirm) {
  if (!password || password.length < 6) return { message: 'A senha deve ter pelo menos 6 caracteres' };
  if (password !== passConfirm) return { message: 'As senhas tem que ser iguais' };
  return true;
}

function checkname(firstName, lastName) {
  if (firstName < 3) return { message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' };
  if (lastName < 3) return { message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras' };
  return true;
}

const checkInfo = (email, password, passConfirm, firstName, lastName) => {
  checkmail(email);
  checkpass(password, passConfirm);
  checkname(firstName, lastName);
  connection()
    .then((db) => db.getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute());
  return { message: 'Cadastro efetuado com sucesso!' };
};

const findById = async (id) => connection()
  .then((db) => db.getTable('users')
    .select(['id', 'email', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', id)
    .execute())
  .then((results) => results.fetchAll()[0])
  .then((user) => user);

const saveUserInDB = ({
  email, password, passConfirm, firstName, lastName,
}) => checkInfo(email, password, passConfirm, firstName, lastName);

const getRecipeInfo = async (id) => {
  const recipeInfo = await connection()
    .then((db) => db.getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then((recipe) => recipe);
  const [_id, userId, user, name, ingredients, instructions] = recipeInfo;
  return {
    id: _id, userId, user, name, ingredients, instructions,
  };
};

const searchByName = (name) => connection()
  .then((db) => db.getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('name like :name')
    .bind('name', name)
    .execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([id, userId, user, recipeName, ingredients, instructions]) => ({
    id, userId, user, recipeName, ingredients, instructions,
  })));

const saveNewRecipeInDB = async (userId, { name, ingredients, instructions }) => {
  const user = await findById(userId);
  const userName = `${user[2]} ${user[3]}`;

  connection()
    .then((db) => db.getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, userName, name, ingredients, instructions)
      .execute());
};

const upDateRecipeInDB = async (id, userId, { name, ingredients, instructions }) => {
  const user = await findById(userId);
  const userName = `${user[2]} ${user[3]}`;
  connection()
    .then((db) => db.getTable('recipes')
      .update()
      .set('id', id)
      .set('user_id', userId)
      .set('user', userName)
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute());
};

const deleteRecipeFromDB = (id) => {
  connection()
    .then((db) => db.getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute());
};

const checkPassword = async (id, { password }, recipeId) => {
  const userInfo = await connection()
    .then((db) => db.getTable('users')
      .select(['password'])
      .where('id = :id')
      .bind('id', id)
      .execute())
    .then((results) => results.fetchAll()[0])
    .then((user) => user);
  const [pass] = userInfo;
  if (password === pass) { deleteRecipeFromDB(recipeId); return { message: 'ok' }; }
  return { message: 'Senha Incorreta.' };
};

const showMyRecipesFromDB = (id) => connection()
  .then((db) => db.getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('user_id = :id')
    .bind('id', id)
    .execute())
  .then((results) => results.fetchAll())
  .then((recipes) => recipes.map(([recipeId, name, user]) => ({ recipeId, name, user })));

module.exports = {
  findByEmail,
  findById,
  showAll,
  saveUserInDB,
  getRecipeInfo,
  searchByName,
  saveNewRecipeInDB,
  upDateRecipeInDB,
  checkPassword,
  showMyRecipesFromDB,
};
