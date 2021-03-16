// Create a new 'render' controller method
exports.index = function (req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('index', {
        pageTitle: 'Brew4You',
        customerName: null,
    });
};
