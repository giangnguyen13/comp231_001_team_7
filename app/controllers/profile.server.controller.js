var constant = require('../../config/constant');

// Load the 'Order' Mongoose model
var Order = require('mongoose').model('Order');
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
        isLoyaltyCustomer: req.body.isLoyaltyCustomer == 'on',
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

exports.viewOrderHistory = function (req, res) {
    const query = {
        user: req.body.userId,
        stage: {
            $in: [constant.ORDER_STAGE_PAID],
        },
    };
    let orderId = req.query.orderid;
    Order.find(query)
        .sort({ created: 'desc' })
        .exec(function (err, orders) {
            if (err) {
                console.log(err);
                res.render('error/error-page', {
                    pageTitle: '500',
                    orders: {},
                });
            } else {
                const trackingValues = [
                    ...new Set(
                        orders
                            .map((order) => order.trackingNumber)
                            .filter((value) => value != null)
                    ),
                ];

                // if has order tracking number filter
                if (orderId) {
                    const filteredOrder = orders.filter(
                        (order) => order.trackingNumber == orderId
                    );
                    if (filteredOrder.length > 0) {
                        var orderStatusNumber = filteredOrder[0].status;
                        if (
                            orderStatusNumber != constant.ORDER_STATUS_DELIVERED
                        ) {
                            filteredOrder.forEach((order) => {
                                order.status = ++orderStatusNumber;
                                order.save();
                            });
                        }
                        res.render('order/order_history', {
                            pageTitle: 'Order History',
                            trackingValues: trackingValues,
                            orders: filteredOrder,
                        });
                    } else {
                        res.render('error/error-page', {
                            pageTitle: '404 Not found',
                            errorCode: 404,
                            errorMessage: 'Cannot find order',
                        });
                    }
                } else {
                    res.render('order/order_history', {
                        pageTitle: 'Order History',
                        trackingValues: trackingValues,
                        orders: orders.filter(
                            (order) => order.trackingNumber == trackingValues[0]
                        ),
                    });
                }
            }
        });
};
