const registerForm = async (req, res) => {
  await console.log(req)
  return res.render('register');
};

const register = async (req, _res) => {
  await console.log(req)
}

module.exports = {
  registerForm,
  register,
};
