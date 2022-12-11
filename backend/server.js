const express = require('express')
require('dotenv').config()
const cors = require('cors')
const axios = require('axios')

const server = express()
const PORT = 3000

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})