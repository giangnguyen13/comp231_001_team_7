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
    console.log('in menuList');
    // Use the 'Product' static 'find' method to retrieve the list of items
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
                product: products,
            });
        }
    });
};
