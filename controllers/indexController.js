const Category = require('../models/category');
const async = require('async');
const validator = require('express-validator');
const { validationResult } = require('express-validator/check');


exports.index = function (req, res) {
    Category.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_categories) {
            if (err) { return next(err) };
            res.render('index', { title: 'Home', category_list: list_categories });
        });
};