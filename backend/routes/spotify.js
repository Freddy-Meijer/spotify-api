const express = require('express')
const querystring = require("querystring");
const axios = require("axios");
const router = express.Router()

router.get('/spotify_login', async (req, res) => {
    let scope = 'user-read-private user-read-email';
    const state = 'my-secret-state'

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: 'http://localhost:3000/api/login_callback/',
            state: state
        }));
})

router.get('/login_callback', async (req, res) => {
    const code = req.query.code
    const token_response = await axios.post('https://accounts.spotify.com/api/token', {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": 'http://localhost:3000/api/login_callback/'
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

    res.cookie('spotify', JSON.stringify(token_response.data))
        .redirect('http://localhost:5173/')
})

router.post('/refresh_token', async (req, res) => {
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

router.post('/user', async (req, res) => {
    let token;

    try {
        token = req.body.token
    } catch (e) {
        res.status(400).send({error: e, message: "Access token is required"})
    }
    try {
        const userData = await axios.get('https://api.spotify.com/v1/me', {
            "headers": {
                "Authorization": 'Bearer ' + token,
                "Content-Type": "application/json",
            }
        })
        res.send(userData.data)
    } catch (e) {
        console.error('Could not get user info:', e)
        res.send(e.data)
    }
})

module.exports = {
    router
}