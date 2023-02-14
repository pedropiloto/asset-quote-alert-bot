require('dotenv').config()
const qs = require('qs')
const axios = require('axios')

let accessToken

const requestAccessToken = async () => {
    const response = await axios({
        method: 'post',
        url: `${process.env.UPHOLD_BASE_URL}/oauth2/token`,
        data: qs.stringify({
            client_id: `${process.env.UPHOLD_CLIENT_ID}`,
            client_secret: `${process.env.UPHOLD_CLIENT_SECRET}`,
            grant_type: 'client_credentials',
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    })
    accessToken = response.data
    return accessToken
}

const getQuote = async (pair) =>
    axios({
        method: 'get',
        url: `${process.env.UPHOLD_BASE_URL}/v0/ticker/${pair}`,
        headers: {
            Authorization: `Bearer + ${
                !accessToken ? requestAccessToken() : accessToken
            }`,
        },
    })

module.exports = {
    getQuote,
}
