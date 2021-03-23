// Load the 'product' controller
var product = require('../controllers/product.server.controller');

// Define the routes module' method
module.exports = function (app) {

    //show the 'add_product' page if a GET request is made to /product
    app.route('/add_product').get(product.renderAdd);
    
    // a post request to /product will execute createProduct method in product.server.controller
    app.route('/products').post(product.createProduct);
    
    app.route('/list_products').get(product.readProduct);

    // Set up the 'courses' parameterized routes
    app.route('/list_products/:productId')
        .get(product.read)
        .put(product.updateByProductId)
        .delete(product.deleteByProductId);

    // Set up the 'productId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('productId', product.findProductByProductId);

};
