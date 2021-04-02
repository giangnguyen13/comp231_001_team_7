// Load the module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    star: String,
    comment: String,
    created: {
        type: Date,
        // Create a default 'created' value
        default: Date.now,
    },
});

mongoose.model('Review', ReviewSchema);
