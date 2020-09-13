const { Router } = require('express');

const { registerController } = require('../controllers');

const cadaster = Router();

cadaster.get('/', (_req, res) => res.render('cadaster', { message: null }));

cadaster.post('/', registerController.registration);

module.exports = cadaster;
