function recipe(recipeAr) {
  const [id, userId, user, name, ingredientes, instructions] = recipeAr;
  const ingredients = ingredientes.split(',');

  return {
    id, userId, user, name, ingredients, instructions,
  };
}

function userSerializer(userarr) {
  const [id, email, password, firstName, lastName] = userarr;
  return {
    id, email, password, firstName, lastName,
  };
}

module.exports = { recipe, user: userSerializer };
