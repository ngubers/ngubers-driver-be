module.exports = (app) => {
    const users = require('../controllers/drivers.controller')
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()
    
    router.get('/order', auth.authorize, users.getOrderList)
    router.put('/order/:id', auth.authorize, users.updateOrder)
    router.get('/', auth.authorize, users.list)
    router.post('/',  auth.authorize, users.create)
    router.get('/:id', auth.authorize, users.find)
    router.put('/:id', auth.authorize, users.update)
    
    

    app.use('/api/drivers', router)
}