require('dotenv').config()
const redis = require('redis')

const options = {
    url: process.env.REDIS_URL,
}

if (process.env.REDIS_PASSWORD) {
    options['password'] = process.env.REDIS_PASSWORD
}

let connected = false
let client = redis.createClient(options)

client.on('error', (error) => {
    console.log(`ERROR connecting to Redis: ${error}`)
})

const connect = async () => {
    await client.connect()
    connected = true
}
const disconnect = async () => {
    await client.disconnect()
    connected = false
}

const get = async (value) => {
    if (!connected) {
        await connect()
    }
    return client.get(value)
}

const set = async (key, value) => {
    if (!connected) {
        await connect()
    }
    return client.set(key, value)
}

const expire = async (key, ttl) => {
    if (!connected) {
        await connect()
    }
    return client.expire(key, ttl)
}

module.exports = {
    get,
    set,
    expire,
    disconnect,
}
