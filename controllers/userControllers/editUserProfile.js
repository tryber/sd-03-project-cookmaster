const { editUser } = require('../../models');

const editUserProfile = async (req, res) => {
  const { email, password, name, lastName } = req.body;

  await editUser(req.user.id, email, password, name, lastName);

  return res.redirect('/');
};

module.exports = editUserProfile;
