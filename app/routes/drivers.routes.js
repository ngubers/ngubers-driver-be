module.exports = (app) => {
    const users = require('../controllers/drivers.controller')
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()
    
    router.put('/update/:id',auth.authorize,users.accDriver)
    router.get('/', auth.authorize, users.list)
    router.post('/',  auth.authorize, users.create)
    router.get('/:id', auth.authorize, users.find)
    router.put('/:id', auth.authorize, users.update)
    
    

    app.use('/api/drivers', router)
}