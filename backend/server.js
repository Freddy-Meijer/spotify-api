const express = require('express')
require('dotenv').config()
const cors = require('cors')
const axios = require('axios')
const querystring = require("querystring");

const server = express()
const PORT = 3000

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cors())

server.get('/spotify_login', async (req, res) => {
    let scope = 'user-read-private user-read-email';
    const state = 'my-secret-state'

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: 'http://localhost:3000/login_callback/',
            state: state
        }));
})

server.get('/login_callback', async (req, res) => {
    const code = req.query.code
    const token_response = await axios.post('https://accounts.spotify.com/api/token', {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": 'http://localhost:3000/login_callback/'
        },
        {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Authorization": 'Basic ' + btoa(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET)
            }
        }
    )
    if (!token_response) {
        res.redirect("http://localhost:5173/error")
    }

    // const expires = new Date(Date.now() + 3600 * 1000)

    res.cookie('sp_at', token_response.data.access_token)
        .cookie('sp_rt', token_response.data.refresh_token)
        .cookie('spotify', JSON.stringify(token_response.data))
        .redirect('http://localhost:5173/')
})

server.post('/refresh_token', async (req, res) => {
    const refreshToken = req.body.refresh_token._value
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Basic ' + btoa(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET)
                }
            })
        res.cookie('spotify', JSON.stringify(response.data)).send(response.data)
    } catch (e) {
        console.log(e)
    }
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})