const validateEmail = (email) => {
  const emailFormat = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(
    String(email).toLowerCase(),
  );
  if (emailFormat && email.trim().length) {
    return true;
  }
  return false;
};

module.exports = { validateEmail };
