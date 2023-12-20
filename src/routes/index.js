const { Router } = require('express');

const usersRoutes = require('./users.routes');
const sessionsRoutes = require('./session.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

module.exports = routes;