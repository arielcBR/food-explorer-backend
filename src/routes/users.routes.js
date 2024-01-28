const { Router } = require('express');

const ensureAuthentication = require('../middlewares/ensureAuthentication');
const usersController = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.get('/favorites/:userId', ensureAuthentication, usersController.favoriteDishesByUser);
usersRoutes.post('/favorites', ensureAuthentication, usersController.setFavorite);

module.exports = usersRoutes;