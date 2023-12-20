const { Router } = require('express');

const sessionController = require('../controllers/SessionController');

const sessionRoutes = Router();

sessionRoutes.post('/', sessionController.signIn);

module.exports = sessionRoutes;