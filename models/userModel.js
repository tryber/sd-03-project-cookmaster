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
    .then((recipes) => recipes.map(([id, email, password, first_name, last_name]) => ({
      id,
      email,
      password,
      name: first_name,
      lastName: last_name,
    })));
};

const findByEmail = async (email) => {
  const users = await getAllUsers();
  
  const searchedUser = users.filter((user) => user.email = email);

  return searchedUser;
};

const findById = async (id) => {
  const users = await getAllUsers();
  
  const searchedUser = users.filter((user) => String(user.id) = String(id));

  return searchedUser;
};

module.exports = {
  findByEmail,
  findById,
};
