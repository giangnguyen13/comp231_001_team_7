const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');

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
            res.redirect('/home');
        }
    });
};

exports.renderChangePassword = function (req, res) {
    User.findById(req.body.userId, (err, user) => {
        if (err) {
            return res.render('error/error-page', {
                pageTitle: 'Server Error',
                errorCode: 500,
                errorMessage: 'Internal Server Error',
            });
        } else {
            res.render('profile/customer-change-password', {
                pageTitle: 'Change password',
                user: user,
            });
        }
    });
};

exports.changePassword = function (req, res) {
    User.findOne({ _id: req.body._id }).exec(function (err, user) {
        const oldPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        if (bcrypt.compareSync(oldPassword, user.password)) {
            req.body.userId = user._id;
            user.password = newPassword;
            user.save();
            res.redirect('/home');
        } else {
            res.json('password not match');
        }
    });
};
