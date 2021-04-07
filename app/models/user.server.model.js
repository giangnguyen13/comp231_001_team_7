// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
// Basic Model, add more field as needed
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    isLoyaltyCustomer: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        // Validate the email format
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password && password.length > 6,
            'Password should be longer',
        ],
    },
    created: {
        type: Date,
        // Create a default 'created' value
        default: Date.now,
    },
    updated: {
        type: Date,
        // Create a default 'updated' value
        default: Date.now,
    },
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        const splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

// Use a pre-save middleware to hash the password
// before saving it into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function (password) {
    return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);
