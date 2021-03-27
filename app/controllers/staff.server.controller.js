const Staff = require('mongoose').model('Staff');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

const getErrorMessage = function (err) {
    // Define the error message variable
    var message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    // Return the message error
    return message;
};

exports.renderSignin = function (req, res, next) {
    res.render('login/staffSignIn', {
        pageTitle: 'Staff Sign-in Form',
    });
};

exports.renderSignup = function (req, res, next) {
    res.render('login/staffSignUp', {
        pageTitle: 'Staff Sign-up Form',
    });
};

exports.signup = function (req, res, next) {
    const staff = new Staff(req.body);
    const message = null;
    staff.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
            return res.redirect('/staff/signup');
        }
        return res.redirect('/staff/login');
    });
};

// verify login function
exports.authenticate = function (req, res, next) {
    const { email, password } = req.body;
    console.log(email);
    Staff.findOne({ email: email }, (err, staff) => {
        if (err) {
            return next(err);
        } else {
            if (!staff) {
                return res.redirect('/staff/login');
            }
            console.log(staff);
            //compare passwords
            if (bcrypt.compareSync(password, staff.password)) {
                // Create a new token with the user id in the payload
                // and which expires 300 seconds after issue
                const staffToken = jwt.sign({ id: staff._id }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds,
                });
                console.log('staffToken:', staffToken);
                req.body.staffId = staff._id;
                // set the cookie as the token string, with a similar max age as the token
                // here, the max age is in milliseconds
                res.cookie('staffToken', staffToken, {
                    maxAge: jwtExpirySeconds * 1000,
                    httpOnly: true,
                });
                next();
            } else {
                res.json({
                    status: 'error',
                    message: 'Invalid email/password!!!',
                    data: null,
                });
            }
        }
    });
};

exports.verifyStaff = function (req, res, next) {
    const staffToken = req.cookies.staffToken;
    console.log('verify staff ' + staffToken);
    if (!staffToken) {
        return res.redirect('/staff/login');
    }
    var payload;
    try {
        payload = jwt.verify(staffToken, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.render('error/error-page', {
                pageTitle: 'Unauthorized',
                errorCode: 401,
                errorMessage: 'Unauthorized Request',
            });
        }
        // otherwise, return a bad request error
        return res.render('error/error-page', {
            pageTitle: 'Bad Request',
            errorCode: 400,
            errorMessage: 'Bad Request',
        });
    }

    // Finally, return the welcome message to the staff, along with their
    // username given in the token
    req.body.staffId = payload.id;
    next();
};

// protected page uses the JWT token
exports.welcome = (req, res) => {
    const staffToken = req.cookies.token;
    if (!staffToken) {
        return res.status(401).end();
    }
    var payload;
    try {
        payload = jwt.verify(staffToken, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    }

    console.log(payload);
    res.send(`Welcome staff with ID: ${payload.id}!`);
};

exports.signout = function (req, res) {
    // Redirect the staff back to the main application page
    res.clearCookie('staffToken');
    res.redirect('/');
};

exports.displayStaffList = function (req, res, next) {
    // Use the 'Staff' static 'find' method to retrieve the list of staff
    Staff.find({}, (err, staff) => {
        if (err) {
            return next(err);
        } else {
            res.json(staff);
        }
    });
};

exports.staffPortal = function (req, res) {
    Staff.findById(req.body.staffId, (err, staff) => {
        if (err) {
            return res.render('error/error-page', {
                pageTitle: 'List All Staff',
                errorCode: 500,
                errorMessage: 'Internal Server Error',
            });
        } else {
            res.render('staff/staffPortal', {
                pageTitle: 'Staff Portal',
                staff: staff,
            });
        }
    });
};
