const { findById } = require('../../models');

const editUserForm = async (req, res) => {
  const userInfos = await findById(req.user.id);

  return res.render('admin/edit-user', { userInfos, message: null, user: req.user });
};

module.exports = editUserForm;
