// Load the module dependencies
const User = require('mongoose').model('User');
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
    res.render('login/signin', {
        pageTitle: 'Sign-in Form',
    });
};

exports.renderSignup = function (req, res, next) {
    res.render('login/signup', {
        pageTitle: 'Sign-up Form',
    });
};

exports.signup = function (req, res, next) {
    const user = new User(req.body);
    const message = null;
    user.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
            return res.redirect('/signup');
        }
        return res.redirect('/');
    });
};

// verify login function
exports.authenticate = function (req, res, next) {
    const { email, password } = req.body;
    console.log(email);
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return next(err);
        } else {
            console.log(user);
            //compare passwords
            if (bcrypt.compareSync(password, user.password)) {
                // Create a new token with the user id in the payload
                // and which expires 300 seconds after issue
                const token = jwt.sign({ id: user._id }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds,
                });
                console.log('token:', token);
                req.body.userId = user._id;
                // set the cookie as the token string, with a similar max age as the token
                // here, the max age is in milliseconds
                res.cookie('token', token, {
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

exports.verifyUser = function (req, res, next) {
    const token = req.cookies.token;
    console.log('verify user ' + token);
    if (!token) {
        return res.redirect('/login');
    }
    var payload;
    try {
        payload = jwt.verify(token, jwtKey);
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

    // Finally, return the welcome message to the user, along with their
    // username given in the token
    req.body.userId = payload.id;
    next();
};
// protected page uses the JWT token
exports.welcome = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).end();
    }
    var payload;
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    }

    console.log(payload);
    res.send(`Welcome user with ID: ${payload.id}!`);
};

exports.signout = function (req, res) {
    // Redirect the user back to the main application page
    res.clearCookie('token');
    res.redirect('/');
};

exports.display = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    User.find({}, (err, users) => {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};
