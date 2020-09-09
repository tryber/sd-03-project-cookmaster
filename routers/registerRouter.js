const { Router } = require('express');

const registerController = require('../controllers/registerController');

const cadaster = Router();

cadaster.get('/', (_req, res) => {
  return res.render('cadaster', { message: null })
});

cadaster.post('/', registerController.registration);

module.exports = cadaster;
