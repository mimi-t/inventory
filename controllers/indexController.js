const Category = require('../models/category');
const async = require('async');
const validator = require('express-validator');
const { validationResult } = require('express-validator/check');