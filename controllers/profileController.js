const profileModel = require('../models/profileModel');

const profilePage = async (req, res) => {
  const { id } = req.user;
  const userData = await profileModel.getUserById(id);
  res.render('profile', { userData, message: null });
};

const profileEdited = async (req, res) => {
  const { id } = req.user;
  const { email, password, confirmPassword, name, lastName } = req.body;
  const messageArr = profileModel.changesAreValid(email, password, confirmPassword, name, lastName);
  const userData = await profileModel.getUserById(id);

  if (messageArr.length > 0) return res.render('profile', { userData, message: messageArr });

  await profileModel.editProfile(id, email, name, lastName, password);

  messageArr.push('Cadastro atualizado com sucesso!');

  return res.render('profile', { message: messageArr, userData });
};

module.exports = {
  profilePage,
  profileEdited,
};
