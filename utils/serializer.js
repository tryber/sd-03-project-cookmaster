function recipe(recipeAr) {
  const [id, userId, user, name, ingredients, instructions] = recipeAr;
  return {
    id, userId, user, name, ingredients, instructions,
  };
}

module.exports = { recipe };
