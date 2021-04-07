var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/comp-231-07');

var Product = require('../models/product.server.model');

var products = [
    new Product({
        productId: '1',
        title: 'Caffe Latte',
        content: 'The perfect balance of rich expresso combined with smooth, creamy steamed milk and velvety foam.',
        price: 3.49,
        productImage: 'caffe_latte.png',
    }),
    new Product({
        productId: '2',
        title: 'Iced Cold Brew',
        content: 'Our signature Iced Cold Brew Coffee is freshly brewed directly over ice, locking the aromatics and delivering a smoother taste than traditional Iced Coffee. Served over ice.',
        price: 2.49,
        productImage: 'iced_brewed.png',
    }),
    new Product({
        productId: '3',
        title: 'Iced Caramel Macchiato',
        content: 'We combine our rich, full-bodied expresso with vanilla-flavoured syrup, milk and ice, then top it off with a caramel drizzle for and oh-so-sweet finish.',
        price: 3.52,
        productImage: 'iced_macchiato.png',
    }),
    new Product({
        productId: '4',
        title: 'Brewed Iced Tea',
        content: 'Our premium English Breakfast Tea, perfectly steeped, chilled, and poured over ice.',
        price: 2.75,
        productImage: 'ice_tea.png',
    }),
    new Product({
        productId: '5',
        title: 'Espresso',
        content: 'Our smooth signature Espresso Roast with rich flavour and caramelly sweetness is at the very heart of everything we do.',
        price: 2.65,
        productImage: 'espresso.png',
    }),
    new Product({
        productId: '6',
        title: 'Iced Caffe Latte',
        content: 'The perfect balance of rich espresso, combined with cold milk and poured over ice.',
        price: 3.24,
        productImage: 'ice-coffee.png',
    }),
    new Product({
        productId: '7',
        title: 'Americano',
        content: 'A full-bodied espresso, with hot water added to equal a cup of coffee.',
        price: 2.75,
        productImage: 'americano.png',
    }),
    new Product({
        productId: '8',
        title: 'Espresso Frappuccino',
        content: 'Coffee is combined with a shot of espresso and milk, then blended with ice to give you a nice little jolt and lots of sipping joy.',
        price: 4.21,
        productImage: 'frappe.png',
    }),
    new Product({
        productId: '9',
        title: 'Cappuccino',
        content: 'A soothing sip, combining equal portions of espresso, steamed milk, and foam for an ideal tasting experience.',
        price: 3.25,
        productImage: 'cappuccino.png',
    }),
    new Product({
        productId: '10',
        title: 'Steeped Tea',
        content: 'Our whole leaf teas are enticing in flavour and soothing to sip.',
        price: 2.76,
        productImage: 'steeped_tea.png',
    }),
    new Product({
        productId: '11',
        title: 'Chai Latte',
        content: 'A boldly aromatic tea latte with high cinnamon and cardamom notes combined with Indonesian black tea from the Bandung region.',
        price: 3.09,
        productImage: 'chai_latte.png',
    }),
    new Product({
        productId: '12',
        title: 'Hot Chocolate',
        content: 'A creamy blend of steamed milk and rich chocolate. It is the delectable taste of hot chocolate you know and love. Can be served with whipped cream.',
        price: 2.99,
        productImage: 'hot_chocolate.png',
    }),
    new Product({
        productId: '13',
        title: 'White Hot Chocolate',
        content: 'A sweet treat with a twist - rich white chocolate blended with creamy steamed milk for a smooth sip. Can be served with whipped cream.',
        price: 2.99,
        productImage: 'white_chocolate.png',
    }),
    new Product({
        productId: '14',
        title: 'Vanilla Bean Frappuccino',
        content: 'Subtle hints of vanilla bean fused with espresso and a touch of sweetness.',
        price: 3.62,
        productImage: 'vanilla_frappe.png',
    }),
    new Product({
        productId: '15',
        title: 'Flat White',
        content: 'The perfect balance of espresso and velvety steamed milk.',
        price: 2.84,
        productImage: 'flat_white.png',
    }),
    new Product({
        productId: '16',
        title: 'Caffe Mocha',
        content: 'A caffè latte with chocolate and whipped cream, made by pouring chocolate sauce into the glass, followed by an espresso shot and steamed milk. ',
        price: 3.12,
        productImage: 'mocha.png',
    }),
    new Product({
        productId: '17',
        title: 'Butter Croissant',
        content: 'Tender buttery, flaky, and viennoiserie pastry.',
        price: 2.75,
        productImage: 'croissant.png',
    }),
    new Product({
        productId: '18',
        title: 'Banana Loaf',
        content: 'Sweet cake-like loaf made with ripe bananas.',
        price: 2.32,
        productImage: 'banana_loaf.png',
    }),
    new Product({
        productId: '19',
        title: 'Double Chocolate Brownie',
        content: 'Rich chocolate brownie with generous chunks of chocolate made for the passionate chocolate lover.',
        price: 3.75,
        productImage: 'brownie.png',
    }),
    new Product({
        productId: '20',
        title: 'Everything Bagel',
        content: 'Locally sourced bagels topped with your choice of premium light cream cheese, cheddar cheese or butter.',
        price: 1.96,
        productImage: 'bagel.png',
    }),
    new Product({
        productId: '21',
        title: 'Ham & Cheddar Sandwich',
        content: 'Black Forest-style ham, Cheddar cheese, lettuce, tomato and ranch dressing.',
        price: 4.93,
        productImage: 'sandwich.png',
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
