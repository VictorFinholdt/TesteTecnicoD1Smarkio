const express = require('express')
const cors = require('cors')
const { roteador } = require('./routes')

let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app = roteador(app)

app.listen(3000, () => console.log('Está funcionando.'))