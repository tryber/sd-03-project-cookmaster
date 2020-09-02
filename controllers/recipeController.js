const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const showResume = async (req, res) => {
  const listResume = await recipeModel.resumeAllRecipes();
  return res.render('home', { listResume, message: null, user: req.user });
};

const showResumeMine = async (req, res) => {
  const { id } = req.user;
  const listResume = await recipeModel.resumeAllRecipesMine(id);
  return res.render('recipesMine', { listResume, message: null, user: req.user });
};

const showRecipe = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const recipe = await recipeModel.getRecipe(id);
  return res.render('recipe', { recipe, message: null, user, id });
};

const searchRecipe = async (req, res) => {
  const user = req.user;
  const { q } = req.body;
  if (!q) {
    return res.render('search', { message: null, user });
  }
  const result = await recipeModel.searchRecipe(q);
  return res.render('search', { message: null, user, result });
};

const insertRecipe = async (req, res) => {
  const user = req.user;
  const { id, name, lastName } = req.user;
  const { recipeNew, secretList, howToDo } = req.body;
  const fullName = `${name} ${lastName}`;
  const result = await recipeModel.insertRecipe(id, fullName, recipeNew, secretList, howToDo);
  // Ref. https://dev.mysql.com/doc/x-devapi-userguide/en/working-with-auto-increment-values.html
  const lastId = result.getAutoIncrementValue();
  return res.render('recipeNew', { message: null, user, result, lastId });
};

const ableToUpdateRecipe = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const user = req.user;
  // validação
  const recipe = await recipeModel.getRecipe(id);
  if (!user || user.id !== recipe[1]) {
    return res.redirect(`/recipes/${id}`);
  }
  return res.render('updateRecipe', { message: null, recipe, user, id });
};

const updateRecipe = async (req, res) => {
  const user = req.user;
  const { recipeNew, secretList, howToDo, pageId } = req.body;
  const result = await recipeModel.updateRecipe(pageId, recipeNew, secretList, howToDo);
  if (result) {
    return res.redirect(`/recipes/${pageId}`);
  }
  return res.status(401).send({ messge: 'Receita não pode ser alterada', user });
};

const ableToDeleteRecipe = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const user = req.user;
  // validação
  const recipe = await recipeModel.getRecipe(id);
  if (!user || user.id !== recipe[1]) {
    return res.render('deleteRecipe', { message: 'Esta receita não é sua!', recipe, user, id, showForm: 0 });
  }
  return res.render('deleteRecipe', { message: null, recipe, user, id, showForm: 1 });
};

const deleteRecipe = async (req, res) => {
  const { params } = req;
  const { id } = params;
  const user = req.user;
  const { senha } = req.body;
  // validação
  const recipe = await recipeModel.getRecipe(id);
  const usuario = await userModel.findByEmail(user.email);
  if (usuario.password !== senha) {
    return res.render('deleteRecipe', { message: 'Senha Incorreta.', user, recipe, id, showForm: 1 });
  }
  // função para excluir receita
  await recipeModel.recipeDelete(recipe[0]);
  return res.redirect('/');
};

module.exports = {
  showResume,
  showRecipe,
  searchRecipe,
  insertRecipe,
  ableToUpdateRecipe,
  updateRecipe,
  showResumeMine,
  ableToDeleteRecipe,
  deleteRecipe,
};
