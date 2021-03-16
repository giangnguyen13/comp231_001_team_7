// Load the 'index' controller
const HomeController = require('../controllers/home.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Mount the 'index' controller's 'render' method
    app.get('/', HomeController.index);
};
