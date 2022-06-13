const db = require('../models')

const Driver = db.drivers

module.exports = {
    findAll() {
        return Driver.find()
    },
    findById(id) {
        return Driver.findById(id)
    },
    findByEmail(email) {
        return Driver.findOne({email})
    },
    create(args) {
        return new Driver(args)
    },
    update(id, args) {
        return Driver.findByIdAndUpdate(id, args)
    }
}