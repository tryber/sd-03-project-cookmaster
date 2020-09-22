const getNewUser = (_req, res) =>
  (res.render('formUser', { message: false }));

module.exports = getNewUser;
