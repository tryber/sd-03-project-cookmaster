const { authMiddleware } = require('./auth');
const { vRegister } = require('./auth');

module.exports = {
  auth: authMiddleware,
  vRegister,
};
