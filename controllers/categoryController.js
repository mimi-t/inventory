const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display detail page for a specific Category.
exports.category_detail = function (req, res, next) {
    console.log('id ' + req.params.id);
    async.parallel({
        category: function (callback) {
            Category.findById(req.params.id)
                .exec(callback)
        },
        category_items: function (callback) {
            Item.find({ 'category': req.params.id })
                .exec(callback)
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.category == null) {
            let err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category', { title: 'Category list', category: results.category, category_items: results.category_items });
    }
    )
};

// Display Category create form on GET.
exports.category_create_get = function (req, res) {
    //validate fields
    res.render('category_form', { title: 'Create Category' });
};

// Handle Category create on POST.
exports.category_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Category create POST');
};

// Display Category delete form on GET.
exports.category_delete_get = function (req, res) {
    async.parallel({
        category: function (callback) {
            Category.findById(req.params.id)
                .exec(callback);
        },
        category_items: function (callback) {
            Item.find({ category: req.params.id })
                .exec(callback);
        }
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.category == null) {
            let err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_delete', { title: 'Delete Category', category: results.category, category_items: results.category_items });
    })
};

// Handle Category delete on POST.
exports.category_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET.
exports.category_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle category update on POST.
exports.category_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Category update POST');
};