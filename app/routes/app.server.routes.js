// Load the 'index' controller
const HomeController = require('../controllers/home.server.controller');
const LoginController = require('../controllers/login.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/', HomeController.index);
    app.get('/login', LoginController.renderSignin);
    app.post('/login', LoginController.authenticate);
    app.get('/signup', LoginController.renderSignup);
    app.post('/signup', LoginController.signup);
    app.get('/users', LoginController.display);
};
