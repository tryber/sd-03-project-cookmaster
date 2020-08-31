const nameIsValid = (name) => {
  const nameRegEx = /^[a-zA-Z]+$/i;
  if (!nameRegEx.test(name) || name.length < 3) return true;
  return false;
};

module.exports = {
  nameIsValid,
};
