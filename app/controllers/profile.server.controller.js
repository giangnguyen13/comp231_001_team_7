const User = require('mongoose').model('User');

exports.renderEditProfile = function (req, res) {
    User.findById(req.body.userId, (err, user) => {
        if (err) {
            return res.render('error/error-page', {
                pageTitle: 'Server Error',
                errorCode: 500,
                errorMessage: 'Internal Server Error',
            });
        } else {
            res.render('profile/customer-profile-edit', {
                pageTitle: 'Edit Profile',
                user: user,
            });
        }
    });
};

exports.saveProfile = function (req, res) {
    const update = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    User.findByIdAndUpdate(req.body._id, update, function (err, user) {
        if (err) {
            return res.json(err);
        } else {
            req.body.userId = user._id;
            res.redirect('/profile/view');
        }
    });
};

exports.viewProfile = function (req, res) {
    User.findById(req.body.userId, (err, user) => {
        if (err) {
            return res.render('error/error-page', {
                pageTitle: 'Server Error',
                errorCode: 500,
                errorMessage: 'Internal Server Error',
            });
        } else {
            res.render('profile/customer-profile', {
                pageTitle: 'Edit Profile',
                user: user,
            });
        }
    });
};
