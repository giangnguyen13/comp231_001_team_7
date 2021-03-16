// using the ref to reference another document
//
// Load the Mongoose module and Schema object
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Define a new 'UserSchema'
// Basic Model, add more field as needed
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        // Set an email index
        index: true,
        // Validate the email format
        match: /.+\@.+\..+/,
    },

    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 6,
            'Password Should Be Longer',
        ],
    },
})

// Create the 'User' model out of the 'StudentSchema'
mongoose.model('User', UserSchema)
