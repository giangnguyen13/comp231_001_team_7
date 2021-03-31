// Load the Mongoose module and Schema object
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define a new 'OrderSchema'
var OrderSchema = new Schema({
    title: String,
    content: String,
    price: Number,
    quantity: Number,
    stage: String,
    temporaryId: Number,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});
// Create the 'Order' model out of the 'OrderSchema'
module.exports = mongoose.model('Order', OrderSchema);
