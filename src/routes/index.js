const { Router } = require('express');

const usersRoutes = require('./users.routes');
const sessionsRoutes = require('./sessions.routes');
const dishRoutes = require('./dish.routes');
const orderRoutes = require('./orders.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/dish', dishRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/orders', orderRoutes);

module.exports = routes;