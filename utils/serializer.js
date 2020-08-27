function recipe(recipeAr) {
  const [id, userId, user, name, ingredientes, instructions] = recipeAr;
  const ingredients = ingredientes.split(',');

  return {
    id, userId, user, name, ingredients, instructions,
  };
}

function user(userarr) {
  const [id, email, password, first_name, last_name] = userarr;
  return {
    id, email, password, first_name, last_name,
  };
}

module.exports = { recipe, user };
