var express = require('express');
var router = express.Router();

// Require controller modules.
var item_controller = require('../controllers/itemController');

/// ITEM ROUTES ///

// GET request for creating a Item. 
router.get('/create', item_controller.item_create_get);

// POST request for creating Item.
router.post('/create', item_controller.item_create_post);

// GET request for deleting a Item. 
router.get('/:id/delete', item_controller.item_delete_get);

// POST request for deleting Item.
router.post('/:id/delete', item_controller.item_delete_post);

// GET request for updating a Item. 
router.get('/:id/update', item_controller.item_update_get);

// POST request for updating Item.
router.post('/:id/update', item_controller.item_update_post);

// GET request for one Item.
router.get('/:id', item_controller.item_detail);

module.exports = router;
