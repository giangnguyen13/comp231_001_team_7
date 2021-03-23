// Load controllers
const HomeController = require('../controllers/home.server.controller');
const LoginController = require('../controllers/login.server.controller');
const ProfileController = require('../controllers/profile.server.controller');
const ProductController = require('../controllers/product.server.controller');
const MenuListController = require('../controllers/menu_list.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.get('/', HomeController.index);
    app.get('/login', LoginController.renderSignin);
    app.post('/login', LoginController.authenticate, HomeController.home);
    app.get('/signup', LoginController.renderSignup);
    app.post('/signup', LoginController.signup);
    app.get('/signout', LoginController.signout);
    app.get('/users', LoginController.display);
    app.get('/welcome', LoginController.welcome);
    app.get('/home', LoginController.verifyUser, HomeController.home);
    app.get('/profile/view', LoginController.verifyUser, ProfileController.editProfile);
    app.get('/profile/edit', LoginController.verifyUser, ProfileController.editProfile);

    //app.post('/profile/save', LoginController.verifyUser);

    //Products
    app.route('/add_product').get(ProductController.renderAdd);
    app.route('/products').post(ProductController.createProduct);
    app.route('/list_products').get(ProductController.readProduct);
    app.route('/list_products/:productId')
        .get(ProductController.read)
        .put(ProductController.updateByProductId)
        .delete(ProductController.deleteByProductId);

    app.param('productId', ProductController.findProductByProductId);

    //Menu List
    app.route('/menu_list').get(MenuListController.readMenuList);
};
