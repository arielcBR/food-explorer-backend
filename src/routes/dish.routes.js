const multer = require('multer');
const { Router } = require('express');

const uploadConfig = require('../configs/upload');

// middlewares
const ensureAuthentication = require('../middlewares/ensureAuthentication');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

// Controllers
const dishController = require('../controllers/DishController');

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// Routes
dishRoutes.post('/', ensureAuthentication, ensureIsAdmin, upload.any(), dishController.create);
dishRoutes.delete('/:dishId', ensureAuthentication, ensureIsAdmin, dishController.delete);
dishRoutes.get('/', ensureAuthentication, dishController.index);
dishRoutes.get('/search', ensureAuthentication, dishController.search);
dishRoutes.get('/:dishId', ensureAuthentication, dishController.getById);
dishRoutes.patch('/:dishId', ensureAuthentication, ensureIsAdmin, upload.any(), dishController.update);


module.exports = dishRoutes;