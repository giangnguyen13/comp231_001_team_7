const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtKey = config.secretKey;

var Product = require('mongoose').model('Product');

exports.index = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        res.render('index', {
            pageTitle: 'Brew4You',
        });
    } else {
        res.redirect('/menu_list');
    }
};

exports.readMenuList = function (req, res, next) {
    // if user is authenticate, do something special
    const isAuthenticate = req.cookies.token != undefined;
    var payload = null;
    try {
        payload = jwt.verify(req.cookies.token, jwtKey);
    } catch (e) {
        console.log('Not logged in');
    }

    //Use the 'Product' static 'find' method to retrieve the list of items
    Product.find({}, function (err, products) {
        //console.log(product)
        if (err) {
            // Call the next middleware with an error message
            console.log('some error in readMenuList method');
            return next(err);
        } else {
            //
            res.render('menu_list/menu_list', {
                pageTitle: 'Menu List',
                isAuthenticate: isAuthenticate,
                userId: payload != null ? payload.id : null,
                product: products,
            });
        }
    });
};
