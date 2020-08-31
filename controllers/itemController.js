const Item = require('../models/item');
const Category = require('../models/category');
const async = require('async');
const validator = require('express-validator');

// Display detail page for a specific Item.
exports.item_detail = function (req, res, next) {
    Item.findById(req.params.id)
        .populate('category')
        .exec(function (err, result) {
            if (err) {
                return next(err);
            }
            if (result == null) {
                let err = new Error('Item not found');
                err.status = 404;
                return next(err);
            }
            res.render('item', { title: 'Item detail', item: result });
        })
};

// Display Item create form on GET.
exports.item_create_get = function (req, res) {
    Category.find()
        .exec(function (err, result) {
            if (err) {
                return next(err);
            }
            if (result == null) {
                let err = new Error('Categories not found');
                err.status = 404;
                return next(err);
            }
            res.render('item_form', { title: 'Create Item', categories: result });
        });
};

// Handle Item create on POST.
exports.item_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Item create POST');
};

// Display Item delete form on GET.
exports.item_delete_get = function (req, res) {
    Item.findById(req.params.id)
        .exec(function (err, result) {
            if (err) {
                return next(err);
            }
            if (result == null) {
                let err = new Error('Item not found');
                err.status = 404
                return next(err);
            }
            res.render('item_delete', { title: 'Delete Item', item: result })
        })
};

// Handle Item delete on POST.
exports.item_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Item delete POST');
};

// Display Item update form on GET.
exports.item_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Item update GET');
};

// Handle item update on POST.
exports.item_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Item update POST');
};
