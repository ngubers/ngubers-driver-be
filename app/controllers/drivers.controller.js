const driverService = require('../services/drivers.service')

function encryptPassword(password) {
    return new Promise((resolve, rejected) => {
        bcrypt.hash(password, salt, (err, encryptedPassword) => {
            if (!!err) {
                rejected(err)
                return
            }

            resolve(encryptedPassword)
        })
    })
}

exports.list = async (req, res) => {
    try {
        const response = await driverService.list()
        const {data: datas} = response
        const driver = datas.map(item => ({
            full_name: item.full_name,
            email: item.email,
            password: item.password,
            phone_number: item.password,
            address: item.address,
            no_ktp: item.no_ktp,
            file: `http://localhost:3001/public/uploads/${item.file}`,
        }))

        res.json({
            status: "OK",
            data: driver
        })
    } catch(error) {
        res.status(400).json({
            status: "FAIL",
            message: error.message
        })
    }
}

exports.create = async (req, res) => {
    const {full_name, email, password, address} = req.body
    try {
        const encryptedPassword = encryptPassword(password)
        const user = await driverService.create({
            full_name: full_name,
            email: email,
            password: encryptedPassword,
            address: address
        })
        res.send({
            message: "User berhasil dibuat",
            data: user
        })
    }
    catch(error) {
        res.status(409).send({
            message: error.message || "Some error while create users."
        })
    }
}

exports.find = async (req, res) => {
    try{
        const {id} = req.params
        const user = await driverService.find(id)
        
        if (!user) {
            throw Error('Data user tidak ditemukan')
        }

        res.json({
            message: "Data user ditemukan",
            data: user
        })

    } catch(error) {
        res.status(404).send({
            message: error.message
        })
    }
}

exports.update = async (req, res) => {
    const {id} = req.params
    const {full_name, email, password, address} = req.body
    try {
        const encryptedPassword = encryptPassword(password)
        const user = await driverService.update(id, {
            full_name,
            email,
            password: encryptedPassword,
            address
        })

        if (!user) {
            throw Error('User tidak ditemukan')
        }

        res.json({
            message: "Data user berhasil di update",
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}