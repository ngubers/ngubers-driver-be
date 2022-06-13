const driverRepository = require('../repositories/drivers.respository')

module.exports = {
    async list() {
        try {
            const driver = await driverRepository.findAll()

            return {
                data: driver
            }
        }
        catch(error) {
            console.log(error)
        }
    },

    async create(args) {
        try {
            const driver = await driverRepository.create(args)
            return driver.save()
        }
        catch(error) {
            console.log(error)
        }
    },

    async find(id) {
        try {
            const driver = await driverRepository.findById(id)
            return driver
        } catch(error) {
            console.log(error)
        }
    },

    async findByEmail(email) {
        try {
            const driver = await driverRepository.findByEmail(email)
            return driver
        }
        catch(error) {
            console.log(error)
        }
    },

    async update(id, args) {
        try {
            const driver = await driverRepository.update(id, args)
            return driver
        } catch(error) {
            console.log(error)
        }
    }
}