const products = require('./products')
const category = require('./category')
const account = require('./account')
const order = require('./order')

function route(app) {
    app.use('/api/accounts', account)
    app.use('/api/products', products)
    app.use('/api/category', category)
    app.use('/api/order', order)
}

module.exports = route