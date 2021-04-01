// Load the module dependencies
const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

exports.review = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        res.render('review/review', {
            pageTitle: 'Brew4You',
        });
    } else {
        res.redirect('/review');
    }
};