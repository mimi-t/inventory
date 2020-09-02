const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display detail page for a specific Category.
exports.category_detail = function (req, res, next) {
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
exports.category_create_post = [
    // validate and sanitise 
    body('category_name').trim().isLength({ min: 1 }).withMessage('Category name required.').escape(),
    body('category_desc').trim().isLength({ min: 1 }).withMessage('Category description required.').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        // if there are errors render the form again with sanitized values/errors messages
        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Create Category', category: req.body, errors: errors.array() });
            return;
        } else {
            Category.findOne({ 'name': req.body.category_name })
                .exec(function (err, found_category) {
                    if (err) {
                        return next(err);
                    }
                    if (found_category) {
                        res.redirect(found_category.url)
                    } else {
                        let new_category = new Category({
                            name: req.body.category_name,
                            description: req.body.category_desc,
                        });
                        new_category.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Successful - redirect to new category.
                            res.redirect(new_category.url);
                        });
                    }
                });
        }
    }
]

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
    async.parallel({
        category: function (callback) {
            Category.findById(req.params.id).exec(callback)
        },
        category_items: function (callback) {
            Item.find({ 'category': req.params.id }).exec(callback)
        },
    }, function (err, result) {
        if (err) {
            return err;
        }
        if (result.category_items.length > 0) {
            res.render('category_delete', { title: 'Delete Category', category: result.category, category_items: result.category_items });
            return;
        }
        Category.findByIdAndDelete(req.body.category_id, function (err) {
            if (err) {
                return next(err);
            }
            res.render('message', { title: 'Successfully deleted', msg: 'The category has been successfully deleted!' })
        });
    });
};

// Display Category update form on GET.
exports.category_update_get = function (req, res) {
    Category.findById(req.params.id)
        .exec(function (err, result) {
            if (err) {
                return next(err);
            }
            if (result == null) {
                let err = new Error('Category not found');
                err.status = 404;
                return next(err);
            }
            res.render('category_form', { title: 'Update Category', category: result });
        })
};

// Handle category update on POST.
exports.category_update_post = [
    // validate and sanitise 
    body('category_name').trim().isLength({ min: 1 }).withMessage('Category name required.').escape(),
    body('category_desc').trim().isLength({ min: 1 }).withMessage('Category description required.').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        let new_category = new Category({
            _id: req.params.id,
            name: req.body.category_name,
            description: req.body.category_desc,
        });
        // if there are errors render the form again with sanitized values/errors messages
        if (!errors.isEmpty()) {
            res.render('category_form', { title: 'Update Category', category: new_category, errors: errors.array() });
        } else {
            Category.findOne({ 'name': req.body.category_name })
                .exec(function (err, found_category) {
                    if (err) {
                        return next(err);
                    }
                    if (found_category) {
                        res.redirect(found_category.url)
                    } else {
                        Category.findByIdAndUpdate(req.params.id, new_category, {}, function (err, category) {
                            if (err) {
                                return next(err);
                            }
                            // Successful - redirect to new category.
                            res.redirect(category.url);
                        });
                    }
                });
        }
    }
];