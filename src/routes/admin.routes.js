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
adminRoutes.post('/dish', ensureAuthentication, ensureIsAdmin, upload.any(), adminController.createDish);

module.exports = adminRoutes;