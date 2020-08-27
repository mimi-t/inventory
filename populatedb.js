#! /usr/bin/env node

console.log('This script populates the database');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Category = require('./models/category');
var Item = require('./models/item');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = [];
var items = [];

function categoryCreate(name, description, cb) {
    var category = new Category({ name: name, description: description });

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category)
        cb(null, category);
    });
}


function itemCreate(name, description, category, price, stock, cb) {
    itemdetail = {
        name: name,
        description: description,
        category: category,
        price: price,
        stock: stock
    }

    var item = new Item(itemdetail);
    item.save(function (err) {
        if (err) {
            console.log('ERROR CREATING Item: ' + item);
            cb(err, null)
            return
        }
        console.log('New Item: ' + item);
        items.push(item)
        cb(null, category)
    });
}


function createCategories(cb) {
    async.series([
        function (callback) {
            categoryCreate("Diaries & Planners", "Stay organised with our range of diaries and planners, they'll help keep you on track with your goals and focused on " +
            "the important things.", callback);
        },
        function (callback) {
            categoryCreate("Journals", "These journals will help you notice and enjoy the small things in life, jot down your thoughts, dreams, and memories in " +
            "in one of our many journals.", callback);
        },
        function (callback) {
            categoryCreate("Notebooks", "Have an idea or just looking to write notes? Our notebooks are versatile, with a range of styles for everyone", callback);
        },
        function (callback) {
            categoryCreate("Pencil Cases", "Our pencil cases are perfect for keeping your stationery tidy and organised. They come in all shapes, sizes, and " + 
            "materials, and are perfect for travelling or commuting about.", callback);
        },
        function (callback) {
            categoryCreate("Pens, Pencils & Markers", "Get inspired with our collection of pens, pencils, and markers. Whatever your needs, we got the right " +
            "one for you.", callback);
        },
        function (callback) {
            categoryCreate("Desk Accessories", "Spruce up your space with these neat desk accessories. No matter your workspace, these essentials are a must-have " + 
            "for everyone.", callback);
        },
        function (callback) {
            categoryCreate("Stickers & Washi Tape", "Keep things stylish and personalised with our selection of stickers and washi tape. Featuring an " + 
            "assortment of designs, these stickers will give that extra oomph to your journals, laptop and much more.", callback);
        },
    ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function (callback) {
            itemCreate('A5 Plan Ahead Planner', 'Plan and prioritize your busy schedule! The A5 planner has different sections for you to fill out, ' + 
            'so you can be super productive with your time.', categories[0], 7.99, 11, callback)
        },
        function (callback) {
            itemCreate('A5 Weekly Feature Diary', 'We are all so busy these days it’s good to write things down in a diary so you can keep track of your ' + 
            'life! A5 size diary with a weekly page layout.', categories[0], 16.99, 36, callback)
        },
        function (callback) {
            itemCreate('A4 Desk Planner', 'Our desk planners are beautifully designed and made for all avid planners out there. This desk planner features ' + 
            'tear-away pages on a hardcover back and fixed with metal rivets for a premium look and feel.', categories[0], 14.99, 9, callback)
        },
        function (callback) {
            itemCreate('A5 Snap Journal', 'This fresh and functional A5 Snap Journal is perfect for all your thoughts, ideas, notes, ramblings, ' + 
            'dreams and goals. Soft to touch and stylish, this is your ultimate stationery must-have.', categories[1], 19.99, 49, callback)
        },
        function (callback) {
            itemCreate('A5 Dot Journal', 'The A5 Dot journal is a must-have stationery item! It features over 180 dot printed acid free pages ' + 
            'for beautiful note taking. It\'s the journal to suit every need!', categories[1], 14.99, 30, callback)
        },
        function (callback) {
            itemCreate('Mini Activity Journal', 'Activity books have been highlighted as a perfect way for people to step back from the daily grind ' + 
            'and practice gratitude through the exercise of mindfulness.', categories[1], 7.99, 29, callback)
        },
        function (callback) {
            itemCreate('A4 Campus Notebook Recycled', 'The notebook for the quintessential organiser. Separate your subjects and keep all of your notes, ' + 
            'doodles, clippings and worksheets in the one fresh A4 sized notebook.', categories[2], 9.99, 24, callback)
        },
        function (callback) {
            itemCreate('A5 Bonded Leather Notebook', 'Keep all your notes, ideas and thoughts together in this chic grid design A5 Bonded Leather Journal, ' + 
            'it comes complete with a elastic closure and ribbon page marker.', categories[2], 13.50, 25, callback)
        },
        function (callback) {
            itemCreate('Archer Pencil Case', 'Our Archer Pencil Case is the perfect study buddy! The double zip fabric case comes in a range of cool designs.' + 
            'keep everything secure and add a touch of style with its beautiful design.', categories[3], 9.99, 18, callback)
        },
        function (callback) {
            itemCreate('Linen-Look Curve Pouch', 'Fill this beautiful linen-look Curve Pouch with all your essentials. From school supplies to makeup, ' + 
            'jewellery and other bits and bobs, it’s the perfect size to pop in your handbag, luggage or school bag.', categories[3], 24.99, 13, callback)
        },
        function (callback) {
            itemCreate('Maple Curve Pouch', 'Say hello to your new essential! This soft-touch non-leather Maple Curve Pouch makes the perfect travel companion ' + 
            'whilst keeping all of your essentials safe in organised style. ', categories[3], 25.99, 16, callback)
        },
        function (callback) {
            itemCreate('Dual Markers 6Pk', 'Express your creativity with Typo’s Dual End Markers. It features a brush tip and felt tip end, allowing ' + 
            'to create strokes in varying sizes.', categories[4], 9.99, 21, callback)
        },
        function (callback) {
            itemCreate('Metal Retractable Ballpoint Pen', 'Take note of this must-have gold-coloured Metal Retractable Ballpoint Pen. This pen is the tool ' + 
            'you need for jotting down important notes, goals and anything else that arises during your productive days.', categories[4], 2.80, 37, callback)
        },
        function (callback) {
            itemCreate('Felt Tip Pens 10Pk', 'These felt tip pens are perfect for adding some fun to your everyday notes. Use them in your planner, diary, ' + 
            'notebook or anywhere you want to add a pop of colour.', categories[4], 13.95, 24, callback)
        },
        function (callback) {
            itemCreate('Usb Desk Lamp', 'Our new USB desk lamp is the perfect addition to your desk! Brighten up your home or space with this sleek minimalist ' + 
            'lamp.', categories[5], 29.99, 12, callback)
        },
        function (callback) {
            itemCreate('Pen Holder', 'Who wants an ordinary pen holder when you could place your pen in one of these babies?! You don\'t have to be limited ' + 
            'to the desk, use them in your bathroom to store your makeup brushes.', categories[5], 11.99, 48, callback)
        },
        function (callback) {
            itemCreate('Tape Dispenser', 'Keep this neat Tape Dispenser at your workspace to add some simple style. Made from clear acrylic and in a variety ' + 
            'of eye catching designs.', categories[5], 10.00, 33, callback)
        },
        function (callback) {
            itemCreate('Washi Tape 2Pk', 'Our washi tape is versatile and a stationery essential! Decorating your diary or journal? Wrapping presents? Our ' + 
            'washi tape will have you sorted!', categories[6], 6.99, 41, callback)
        },
        function (callback) {
            itemCreate('Sticker Book Vanilla', 'With over 160 stickers and gift tags between its pages, this Sticker Book is perfect for lovers of DIY ' + 
            'and creativity.', categories[6], 17.99, 27, callback)
        },
        function (callback) {
            itemCreate('Sticker Sheets 2Pk Multi', 'Embrace our creative side with this two-pack of Sticker Sheets – perfect for lovers of DIY, fun and ' + 
            'inspiration.', categories[6], 3.99, 19, callback)
        }
    ],
        // Optional callback
        cb);
}



async.series([
    createCategories,
    createItems
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Items: ' + items);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });




