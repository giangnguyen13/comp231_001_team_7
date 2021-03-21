const User = require('mongoose').model('User');

exports.index = function (req, res) {
    res.render('index', {
        pageTitle: 'Brew4You',
    });
};

exports.home = function (req, res) {
    console.log(req.body.userId);
    User.findById(req.body.userId, (err, user) => {
        if (err) {
            return res.render('error/error-page', {
                pageTitle: 'List All Users',
                errorCode: 500,
                errorMessage: 'Internal Server Error',
            });
        } else {
            res.render('home', {
                pageTitle: 'Home Page',
                //user: user,
                customerName: user.firstName ? user.firstName : 'not  good',
            });
        }
    });
};
