const multer = require('multer');
const { Router } = require('express');

const uploadConfig = require('../configs/upload');

// middlewares
const ensureAuthentication = require('../middlewares/ensureAuthentication');
const ensureIsAdmin = require('../middlewares/ensureIsAdmin');

// Controllers
const adminController = require('../controllers/AdminController');

const adminRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// Routes
adminRoutes.post('/dish', ensureAuthentication, ensureIsAdmin, upload.any(), adminController.create);
adminRoutes.delete('/dish/:dishId', ensureAuthentication, ensureIsAdmin, adminController.delete);
adminRoutes.get('/dish', ensureAuthentication, adminController.getAll);
adminRoutes.get('/dish/:dishId', ensureAuthentication, adminController.get);
adminRoutes.patch('/dish/:dishId', ensureAuthentication, ensureIsAdmin, upload.any(), adminController.update);


module.exports = adminRoutes;