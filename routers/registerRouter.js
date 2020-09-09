const { Router } = require('express');

const registerController = require('../controllers/registerController');

const cadaster = Router();

cadaster.get('/cadaster', (req, res) => {
  return res.render('cadaster')
});

cadaster.post('/cadaster', registerController.registration);

module.exports = cadaster;
