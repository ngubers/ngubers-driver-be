const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer(storage)

module.exports = (app) => {
    const auth = require('../controllers/auth.controller')
    const router = require('express').Router()

    router.post('/login',auth.login)
    router.post('/register', upload.single('file'), auth.register)

    app.use('/', router)
}