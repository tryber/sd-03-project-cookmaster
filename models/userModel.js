const connect = require('./connection');

const findByEmail = async (uEmail) => {
  try {
    const user = await connect()
      .then((db) => db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', uEmail)
      .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, email, password, firstName, lastName]) => ({
      id, email, password, firstName, lastName,
    }));
    return user;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  return 1;
};

const findById = async (id) => {
  return id;
};

module.exports = {
  findByEmail,
  findById,
};
