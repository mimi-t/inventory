const Item = require('../models/item');
const Category = require('../models/category');
const async = require('async');
const { body, validationResult } = require('express-validator');

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
exports.item_create_post = [
    // validate and sanitise 
    body('item_name').trim().isLength({ min: 1 }).withMessage('Item name required.').escape(),
    body('item_desc').trim().isLength({ min: 1 }).withMessage('Item description required.').escape(),
    body('item_price').isCurrency().withMessage('Item price is invalid.').toFloat(),
    body('item_stock').isInt({ min: 0 }).withMessage('Item stock is invalid.').toInt(),

    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors.array());
        // if there are errors render the form again with sanitized values/errors messages
        if (!errors.isEmpty()) {
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
                    res.render('item_form', { title: 'Create Item', item: req.body, categories: result, errors: errors.array() });
                });
        } else {
            let new_item = new Item({
                name: req.body.item_name,
                description: req.body.item_desc,
                category: req.body.item_category,
                price: req.body.item_price,
                stock: req.body.item_stock,
            });
            new_item.save(function (err) {
                if (err) {
                    return next(err);
                }
                // Successful - redirect to new author record.
                res.redirect(new_item.url);
            });
        }
    }
]

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
    async.parallel({
        item: function(callback) {
            Item.findById(req.params.id)
            .populate('Category')
            .exec(callback)
        },
        category: function(callback) {
            Category.find()
            .exec(callback)
        }
    }, function(err, result) {
        if (err) {
            return next(err);
        }
        if (result.item == null) {
            let err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }
        res.render('item_form', {title: 'Update Item', item: result.item, categories: result.category});
    })
};

// Handle item update on POST.
exports.item_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Item update POST');
};
