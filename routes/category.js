var express = require('express');
var router = express.Router();

// Require controller modules.
var category_controller = require('../controllers/categoryController');

/// CATEGORY ROUTES ///

// GET request for creating a Category. 
router.get('/create', category_controller.category_create_get);

// POST request for creating Category.
router.post('/create', category_controller.category_create_post);

// GET request for deleting a Category. 
router.get('/:id/delete', category_controller.category_delete_get);

// POST request for deleting Category.
router.post('/:id/delete', category_controller.category_delete_post);

// GET request for updating a Category. 
router.get('/:id/update', category_controller.category_update_get);

// POST request for updating Category.
router.post('/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/:id', category_controller.category_detail);

module.exports = router;
