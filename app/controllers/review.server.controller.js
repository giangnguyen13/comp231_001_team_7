const Review = require('mongoose').model('Review');

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
            res.json(reviews);
        }
    });
};
