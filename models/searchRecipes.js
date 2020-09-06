const connect = require('./connect');

const findByQuery = async (name) => {
  return connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(["id", "user", "name"])
        .where("name like :name")
        .bind("name", `%${name}%`)
        .execute()
    )
    .then((results) => 
      results.fetchAll()
    )
    .then((results) => 
      results.map(([id, user, name]) => (
      {
        id,
        user,
        name,
      }
    )))
};

const findByUserQuery = async (userId) => {
  return connect()
    .then((db) =>
      db
        .getTable('recipes')
        .select(["id", "user", "name", "user_id"])
        .where("user_id = :userId")
        .bind("userId", userId)
        .execute()
    )
    .then((results) => 
      results.fetchAll()
    )
    .then((results) => 
      results.map(([id, user, name]) => (
      {
        id,
        user,
        name,
      }
    )))
};


module.exports = {
  findByQuery,
  findByUserQuery,
};
