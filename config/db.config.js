const path = require('path')
const root = path.resolve(__dirname, '../')
const env = require('dotenv').config({path: root + '/.env'})

module.exports = {
    url: env.parsed.DATABASE_URL
}