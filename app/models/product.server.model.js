// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'ProductSchema'
var ProductSchema = new Schema({
    productId: { type: String, unique: true, required: true },
    title: String,
    content: String,
    price: Number,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});
// Create the 'Product' model out of the 'ProductSchema'
module.exports = mongoose.model('Product', ProductSchema);
