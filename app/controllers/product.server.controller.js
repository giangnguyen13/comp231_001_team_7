// set up img storage
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '../../../public/img/products-img');
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now()+"");
        callback(null, 'product-img' + '-' + Date.now() + '.jpg');
    },
});
// Load the 'Product' Mongoose model
var Product = require('mongoose').model('Product');

// Create a new 'renderAdd' controller method
exports.renderAdd = function (req, res) {
    // Use the 'response' object to render the 'add_product' view with a 'pageTitle' property
    res.render('products/add_product', { pageTitle: 'Add New Product' });
};

// Create a new 'createProduct' controller method
exports.createProduct = function (req, res, next) {
    let upload = multer({ storage: storage }).single('productImage');
    var filename = '';
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
        filename = req.file.filename;

        // Create a new instance of the 'Product' Mongoose model
        var product = new Product(req.body);
        product.productImage = filename;
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
            res.render('products/list_products', {
                pageTitle: 'Products',
                product: products,
            });
            // res.json(products);
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
