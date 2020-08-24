require('dotenv/config');
const mysqlx = require('@mysql/xdevapi');

let schema;

async function connection() {
  if (schema) Promise.resolve(schema);
  return mysqlx
    .getSession({
      host: process.env.HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: 33060,
    })
}

async function getAllWithUsers() {
  const db = await connection();
  // const tableRecipes = await db.getTable('recipes');
  console.log(db)
  const recipesAndUsers = await db.sql(`
    SELECT CONCAT(first_name, last_name), name
    FROM cookmaster.recipes AS rec
    LEFT JOIN cookmaster.users AS user
    ON user.id = rec.user_id   
  `).execute();
  const all = await recipesAndUsers.fetchAll();
  return all.map(([username, recipeName]) => ({ username, recipeName }));
}

module.exports = {
  getAllWithUsers,
}
