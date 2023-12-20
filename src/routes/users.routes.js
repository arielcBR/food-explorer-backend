const { Router } = require('express');

const usersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);

module.exports = usersRoutes;