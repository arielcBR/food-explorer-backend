const { Router } = require('express');

const orderRoutes = Router();

const ensureAuthentication = require('../middlewares/ensureAuthentication');

// Controllers
const orderController = require('');

orderRoutes.post('/', ensureAuthentication, );


module.exports = orderRoutes;