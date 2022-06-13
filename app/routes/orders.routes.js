module.exports = (app) => {
    const users = require('../controllers/drivers.controller')
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()
    
    router.get('/', auth.authorize, users.getOrderList)
    router.put('/:id', auth.authorize, users.updateOrder)

    app.use('/api/order', router)
}