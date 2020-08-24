require('dotenv/config');
const { connection } = require('./connection');

async function getAllWithUsers() {
  const db = await connection();
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
};
