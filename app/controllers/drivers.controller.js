const axios = require('axios')
const driverService = require('../services/drivers.service')
const accService = require('../services/accdriver.service')
exports.list = async (req, res) => {
    try {
        const response = await driverService.list()
        const { data: datas } = response
        const driver = datas.map(item => ({
            full_name: item.full_name,
            email: item.email,
            password: item.password,
            phone_number: item.phone_number,
            address: item.address,
            no_ktp: item.no_ktp,
            file: `http://localhost:3001/public/uploads/${item.file}`,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }))

        res.json({
            status: "OK",
            data: driver
        })
    } catch (error) {
        res.status(400).json({
            status: "FAIL",
            message: error.message
        })
    }
}

exports.getOrderList = async (req, res) => {
    try {

        const response = await axios.get('http://localhost:3000/api/order', {
            headers: {
                key: "11"
            }
        })
        const { data } = response
        console.log(data);

        res.json({
            status: "OK",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "FAIL",
            message: error.message
        })
    }
}
exports.updateOrder = async (req, res) => {
    try {
        console.log(req.params.id)
        const response = await axios.put(`http://localhost:3000/api/order/${req.params.id}`, {
            driverId: req.body.driverId,
            status: req.body.status
        }, {
            headers: {
                key: "11"
            }
        })
        const { data } = response
        console.log(data);

        res.json({
            status: "OK",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            status: "FAIL",
            message: error.message
        })
    }
}
exports.accDriver = async (req, res) => {
    const { driverId, status = "waiting_response" } = req.body
    const { id } = req.params
    try {
        if (!driverId) {
            res.statusCode = 400
            res.json({
                status: "FAIL",
                message: "driver id harus diisi!"
            })

            return

        }

        await accService.update(id, {
            driverId,
            status
        })

        res.json({
            status: "OK",
            message: "Order berhasil di update!",
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error while making an order"
        })
    }
}
exports.create = async (req, res) => {
    const { full_name, email, password, address } = req.body
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
    catch (error) {
        res.status(409).send({
            message: error.message || "Some error while create users."
        })
    }
}

exports.find = async (req, res) => {
    try {
        const { id } = req.params
        const user = await driverService.find(id)

        if (!user) {
            throw Error('Data user tidak ditemukan')
        }

        res.json({
            message: "Data user ditemukan",
            data: user
        })

    } catch (error) {
        res.status(404).send({
            message: error.message
        })
    }
}

exports.update = async (req, res) => {
    const { id } = req.params
    const { full_name, email, password, address } = req.body
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
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}