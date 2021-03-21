exports.error500 = function (req, res) {
    res.render('error/500', {
        pageTitle: 'Brew4You',
    });
};
