const multer = require('multer');
const { Router } = require('express');

const uploadConfig = require('../configs/upload');

// middlewares
const ensureAuthentication = require('../middlewares/ensureAuthentication');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

// Controllers
const adminController = require('../controllers/AdminController');

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// Routes
dishRoutes.post('/', ensureAuthentication, ensureIsAdmin, upload.any(), adminController.create);
dishRoutes.delete('/:dishId', ensureAuthentication, ensureIsAdmin, adminController.delete);
dishRoutes.get('/', ensureAuthentication, adminController.index);
dishRoutes.get('/search', ensureAuthentication, adminController.search);
dishRoutes.get('/:dishId', ensureAuthentication, adminController.getById);
dishRoutes.patch('/:dishId', ensureAuthentication, ensureIsAdmin, upload.any(), adminController.update);


module.exports = dishRoutes;