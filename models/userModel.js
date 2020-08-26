const connect = require('../models/connect');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

const getUser = async () =>
  connect()
    .then((db) => db.getTable('users').select(
      ['id', 'email', 'password', 'first_name', 'last_name']).execute())
      .then((results) => results.fetchAll())
      .then((cook) => cook.map(([id, email, password, firstName, lastName]) => (
        { id, email, password, firstName, lastName }
      )));

const findShearch = async (objParam, emailOrId) => {
  const user = await getUser();
  const userShearced = user.find((userEmail) => userEmail[objParam] === emailOrId);
  return userShearced;
}

const findByEmail = async (email) => {
  const user = await findShearch('email', email)
  return user;
};

const findById = async (id) => {
  const user = await findShearch('id', id)
  return user;
};

module.exports = {
  findByEmail,
  findById,
};
