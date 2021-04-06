function shouldAddLeading(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

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
        get: (dbDate) => {
            let formattedDate = new Date(dbDate); //Date.prototype.
            const date = shouldAddLeading(formattedDate.getDate());
            const month = shouldAddLeading(
                parseInt(formattedDate.getMonth()) + 1
            );
            const year = formattedDate.getFullYear();
            const hour = shouldAddLeading(formattedDate.getHours());
            const minute = shouldAddLeading(formattedDate.getMinutes());
            return `${date}/${month}/${year} ${hour}:${minute}`;
        },
    },
});

mongoose.model('Review', ReviewSchema);
