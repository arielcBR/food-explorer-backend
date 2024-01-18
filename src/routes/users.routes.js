const { Router } = require('express');

const ensureAuthentication = require('../middlewares/ensureAuthentication');
const usersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.post('/favorites', ensureAuthentication, usersController.setFavorite);
usersRoutes.get('/favorites', ensureAuthentication, usersController.indexByUser);

module.exports = usersRoutes;