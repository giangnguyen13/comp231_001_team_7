const User = require('mongoose').model('User');

exports.editProfile = function (req, res) {
    console.log(req.body.userId);
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
