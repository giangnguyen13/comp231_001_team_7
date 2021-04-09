const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtKey = config.secretKey;

const Review = require('mongoose').model('Review');

exports.review = function (req, res) {
    // if user is authenticate, do something special
    const isAuthenticate = req.cookies.token != undefined;
    var payload = null;
    try {
        payload = jwt.verify(req.cookies.token, jwtKey);
    } catch (e) {
        console.log('Not logged in');
    }
    if (isAuthenticate) {
        res.render('review/review', {
            pageTitle: 'Review',
            isAuthenticate: isAuthenticate,
            userId: payload != null ? payload.id : null,
        });
    } else {
        res.redirect('/');
    }
};

// create a review
exports.createReview = function (req, res) {
    const review = new Review(req.body);
    console.log(`This is the customers review: ${review}`);
    review.save((err) => {
        if (err) {
            return res.redirect('/review');
        }
        return res.redirect('/menu_list');
    });
};

// for staff to list reviews
exports.reviewsList = function (req, res, next) {
    Review.find({}, (err, reviews) => {
        if (err) {
            return next(err);
        } else {
            res.render('staff/review_list', {
                pageTitle: 'Review List',
                reviews: reviews,
            });
        }
    });
};
