const { changeUser, userModel } = require('../models');

const registerUserForm = async(req, res) => {
  const { id } = req.user;
  const userInfor = await userModel.findById(id);
  res.render('users/transition', {
    userInfor,
    user: req.user,
    message: null,
  });
};

const setUserChange = async (req, res, next) => {
  const { id } = req.user;
  const userInfor = await userModel.findById(id);
  const { email, password, name, lastName } = req.body;
  let arrMessage = [];
  if(arrMessage.length > 0)
    return res.render('users/transition', {
      userInfor,
      message: arrMessage,
      redirect: null,
    }
  );
  await changeUser.alterUser(id, email, password, name, lastName)
  return res.redirect('/');
};

module.exports = {
  registerUserForm,
  setUserChange,
};
