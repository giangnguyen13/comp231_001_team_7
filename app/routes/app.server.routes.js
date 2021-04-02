// Load controllers
const HomeController = require('../controllers/home.server.controller');
const LoginController = require('../controllers/login.server.controller');
const ProfileController = require('../controllers/profile.server.controller');
const StaffController = require('../controllers/staff.server.controller');
const ProductController = require('../controllers/product.server.controller');
const MenuListController = require('../controllers/menu_list.server.controller');
const OrderController = require('../controllers/order.server.controller');

// Define the routes module' method
module.exports = function (app) {
    app.get('/', HomeController.index);
    app.get('/welcome', LoginController.verifyUser, HomeController.welcome);
    app.get('/login', LoginController.renderSignin);
    app.post('/login', LoginController.authenticate, HomeController.home);
    app.get('/signup', LoginController.renderSignup);
    app.post('/signup', LoginController.signup);
    app.get('/signout', LoginController.signout);
    app.get('/users', LoginController.display);
    app.get('/welcome', LoginController.welcome);
    app.get('/home', LoginController.verifyUser, HomeController.home);

    app.route('/profile/edit')
        .get(LoginController.verifyUser, ProfileController.renderEditProfile)
        .post(LoginController.verifyUser, ProfileController.saveProfile);

    app.route('/profile/change-password')
        .get(LoginController.verifyUser, ProfileController.renderChangePassword)
        .post(LoginController.verifyUser, ProfileController.changePassword);

    // routes related to staff requirements:
    app.get('/staff/login', StaffController.renderSignin);
    app.post(
        '/staff/login',
        StaffController.authenticate,
        StaffController.staffPortal
    );
    app.get('/staff/signup', StaffController.renderSignup);
    app.post('/staff/signup', StaffController.signup);
    app.get('/staff/signout', StaffController.signout);
    app.get('/staff', StaffController.displayStaffList);
    //Products
    app.route('/add_product').get(ProductController.renderAdd);
    app.route('/products').post(ProductController.createProduct);
    app.route('/list_products').get(ProductController.readProduct);
    app.route('/change_img').post(ProductController.changeImage);
    app.route('/list_products/:productId')
        .get(ProductController.read)
        .put(ProductController.updateByProductId)
        .delete(ProductController.deleteByProductId);

    app.param('productId', ProductController.findProductByProductId);

    //Menu List
    app.route('/menu_list').get(MenuListController.readMenuList);

    app.route('/forgot_password')
        .get(LoginController.renderForgetPassword)
        .post(LoginController.sendVerification);

    app.route('/new_password').post(LoginController.changePassword);

    //Order
    app.route('/createOrder').post(OrderController.createOrder);
    app.route('/cart').get(OrderController.readCart);
    app.route('/cart/:orderId')
        .get(OrderController.readCart)
        .put(OrderController.updateById)
        .delete(OrderController.deleteById);

    //Checkout
    app.route('/checkout').get(OrderController.readCheckout);
    app.route('/pay').post(OrderController.pay);
};
