const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

//ngirim dari json
app.use(bodyParser.json())
//ngirim data semisal file gambar dsb
app.use(bodyParser.urlencoded({extended:true}))

const db = require('./app/models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected!')
    })
    .catch(error => {
        console.log("Can't connect to the database!", error)
        process.exit()
    }) 

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

require('./app/routes/drivers.routes')(app)
require('./app/routes/auth.routes')(app)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})