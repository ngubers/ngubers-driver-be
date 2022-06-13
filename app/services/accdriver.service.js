const userRepository = require('../repositories/drivers.respository')

async function findIdUser(id) {
    const users = await userRepository.findById(id)
    return {
        id: users.id,
        full_name: users.full_name,
    }

}

module.exports = {


    async update(id, args) {
        try {
            const order = await userRepository.update(id, args)
            return order
        } catch(error) {
            console.log(error)
        }
    }
}