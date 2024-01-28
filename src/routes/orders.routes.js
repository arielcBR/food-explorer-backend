const { Router } = require('express');

const orderRoutes = Router();

// Middlewares
const ensureAuthentication = require('../middlewares/ensureAuthentication');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

// Controllers
const orderController = require('../controllers/OrderController');

orderRoutes.post('/', ensureAuthentication, orderController.create);
orderRoutes.get('/', ensureAuthentication, orderController.getOrderDetails);
orderRoutes.get('/:userId', ensureAuthentication, orderController.getUsersOrders);
orderRoutes.patch('/', ensureAuthentication, ensureIsAdmin, orderController.update);


module.exports = orderRoutes;