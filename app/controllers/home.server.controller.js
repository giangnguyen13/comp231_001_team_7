// Load the module dependencies
const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

// Create a new 'render' controller method
exports.index = function (req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('index', {
        pageTitle: 'Brew4You',
    });
};

// protected page uses the JWT token
exports.welcome = (req, res) => {
    // We can obtain the session token from the requests cookies,
    // which come with every request
    const token = req.cookies.token;

    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return res.status(401).end();
    }

    var payload;
    try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).end();
        }
        // otherwise, return a bad request error
        return res.status(400).end();
    }

    // Finally, return the welcome message to the user, along with their
    // username given in the token
    console.log(payload);
    //res.send(`Welcome user with ID: ${payload.id}!`);
    // Use the 'response' object to render the 'index' view with a 'title' property
    res.render('welcome', {
        pageTitle: 'Brew4You',
        customerName: payload.id,
    });
};
