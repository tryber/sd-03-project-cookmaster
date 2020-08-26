function recipe(recipe){
  const [id,userId,user,name,ingredients,instructions] = recipe
  return {id,userId,user,name,ingredients,instructions}

}

module.exports = {recipe}
