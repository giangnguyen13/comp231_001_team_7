// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

// Define a new 'StaffSchema'
// Basic Model, add more field(s) as needed
const StaffSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String,
    email: {
        type: String,
        // Validate the email format (must include '@brew4you.ca')
        match: [
            /[a-zA-Z0-9]+@brew4you\.ca/i,
            '(Staff) Please fill a valid email address - email format must include @brew4you.ca',
        ],
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password && password.length > 5,
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
StaffSchema.virtual('fullName')
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
StaffSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

// Create an instance method for authenticating Staff
StaffSchema.methods.authenticate = function (password) {
    return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'StaffSchema' to use getters and virtuals when transforming to JSON
StaffSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

// Create the 'Staff' model out of the 'StaffSchema'
module.exports = mongoose.model('Staff', StaffSchema);
