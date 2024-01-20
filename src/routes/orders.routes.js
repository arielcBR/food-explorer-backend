const { Router } = require('express');

const orderRoutes = Router();

const ensureAuthentication = require('../middlewares/ensureAuthentication');

// Controllers
const orderController = require('../controllers/OrderController');

orderRoutes.post('/', ensureAuthentication, orderController.create);
orderRoutes.get('/:userId', ensureAuthentication, orderController.index);


module.exports = orderRoutes;