const connection = require('./connection');

const getAllUsers = async () => {
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([userId, email, password, firstName, lastName]) => ({
      userId,
      email,
      password,
      name: firstName,
      lastName,
    })));
};

const findByEmail = async (email) => {
  const users = await getAllUsers();

  const searchedUser = users.filter((user) => user.email === email);

  return searchedUser;
};

const findById = async (id) => {
  const users = await getAllUsers();

  const searchedUser = users.filter((user) => parseInt(user.id, 10) === parseInt(id, 10));

  return searchedUser;
};

module.exports = {
  findByEmail,
  findById,
};
