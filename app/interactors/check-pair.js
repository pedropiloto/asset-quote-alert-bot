const BigNumber = require('bignumber.js')
const UpholdGateway = require('../gateways/uphold-gateway')
const redisClient = require('../gateways/redis-gateway')
const TriggerAlertInteractor = require('../interactors/trigger-alert')

const call = async (pair) => {
    const response = await UpholdGateway.getQuote(pair)
    const ask = new BigNumber(response.data.ask)
    const bid = new BigNumber(response.data.bid)
    const mid = ask.plus(bid).dividedBy(2)

    let cached_result = await redisClient.get(pair)

    await redisClient.set(pair, mid.toString())
    const ttl = process.env.REDIS_QUOTE_TTL ? process.env.REDIS_QUOTE_TTL : 5
    await redisClient.expire(pair, ttl)

    if (!cached_result) {
        return
    }

    const previous = new BigNumber(cached_result)
    const diff = previous.minus(mid)
    const absoluteDiff = diff.isNegative() ? diff.negated() : diff

    const percentageDiff = absoluteDiff.dividedBy(previous).multipliedBy(100)

    const percentageAlert = process.env.PERCENTAGE_TO_TRIGGER_ALERT
        ? process.env.PERCENTAGE_TO_TRIGGER_ALERT
        : 0.01

    if (percentageDiff.isGreaterThanOrEqualTo(percentageAlert)) {
        TriggerAlertInteractor.call(pair, percentageDiff, previous, mid)
    }
}

module.exports = { call }
