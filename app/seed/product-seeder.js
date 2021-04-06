var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/comp-231-07');

var Product = require('../models/product.server.model');
var Staff = require('../models/staff.server.model');

var superUser = new Staff({
    firstName: 'Admin',
    lastName: 'User',
    role: 'Administrator',
    email: 'admin@brew4you.ca',
    password: 'welcome',
});

superUser.save();

var products = [
    new Product({
        productId: '1',
        title: 'Tea',
        content: 'Tea from USA',
        price: 1.5,
    }),
    new Product({
        productId: '2',
        title: 'Coffee',
        content: 'Coffee from Canada',
        price: 2.5,
    }),
    new Product({
        productId: '3',
        title: 'Iced Tea',
        content: 'Tea from Mexico',
        price: 3.5,
    }),
];

var done = 0;

for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}
