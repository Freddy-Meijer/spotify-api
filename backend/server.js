const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { router: spotifyRoutes } = require("./routes/spotify")

const server = express()
const PORT = 3000

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())
server.use('/api', spotifyRoutes)

server.get('*', (req, res) => {
    res.send('nothing to see here ...')
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})