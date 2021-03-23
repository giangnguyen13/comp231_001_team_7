// Load the 'Product' Mongoose model
var Product = require('mongoose').model('Product');

// Create a new 'renderAdd' controller method
exports.renderAdd = function (req, res) {
    // Use the 'response' object to render the 'add_product' view with a 'title' property
    res.render('add_product', { title: 'Add New Product' });

};

// Create a new 'createProduct' controller method
exports.createProduct = function (req, res, next) {
    // Create a new instance of the 'Product' Mongoose model
    var product = new Product(req.body);
    // Use the 'Product' instance's 'save' method to save a new product document
    product.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            //res.json(product);
            console.log(product);
            res.redirect('/list_products'); //display all product
        }
    });
};

// Create a new 'readProduct' controller method
exports.readProduct = function (req, res, next) {
    console.log('in readProduct');
    // Use the 'Product' static 'find' method to retrieve the list of items
    Product.find({}, function (err, products) {
        //console.log(product)
        if (err) {
            // Call the next middleware with an error message
            console.log('some error in readProduct method');
            return next(err);
        } else {
            //
            res.render('list_products', {
                title: 'Products',
                product: products,
            });
        }
    });
};

// 'read' controller method to display a product
exports.read = function (req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.product);
};
//
//update a product by product id
exports.updateByProductId = function (req, res, next) {
    let query = { productId: req.params.productId };

    // Use the 'Product' static 'findOneAndUpdate' method
    // to update a specific product by product id
    Product.findOneAndUpdate(query, req.body, (err, product) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(product);
            // Use the 'response' object to send a JSON response
            res.redirect('/list_products'); //display all products
        }
    });
};

// ‘findProductByProductId’ controller method to find a product by its product id
exports.findProductByProductId = function (req, res, next, productId) {
    // Use the 'Course' static 'findOne' method to retrieve a specific product
    Product.findOne(
        {
            productId: productId, //using the product id instead of id
        },
        (err, product) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                // Set the 'req.product' property
                req.product = product;
                console.log(product);
                // Call the next middleware
                next();
            }
        }
    );
};

//delete user by productId
exports.deleteByProductId = function (req, res, next) {
    //initialize findOneAndUpdate method arguments
    var query = { productId: req.params.productId };

    // Use the 'Product' static 'findOneAndUpdate' method
    // to update a specific product by product id
    Product.remove(query, (err, product) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(product);

            // Use the 'response' object to send a JSON response
            res.redirect('/list_products'); //display all product
        }
    });
};
