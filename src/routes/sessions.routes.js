const { Router } = require('express');

const sessionsController = require('../controllers/SessionsController');

const sessionsRoutes = Router();

sessionsRoutes.post('/', sessionsController.signIn);

module.exports = sessionsRoutes;