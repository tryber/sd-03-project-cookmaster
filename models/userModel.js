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
  connect()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute()
    )
    .then((results) => results.fetchAll()[0])
    .then(([name, age] = []) => (name ? { name, age } : null))
    .then(([userId, email, password, firstName, lastName] = []) => (email ? {
      userId,
      email,
      password,
      name: firstName,
      lastName,
    } : null));
};

module.exports = {
  findByEmail,
  findById,
};
