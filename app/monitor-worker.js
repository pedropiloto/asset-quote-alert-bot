const CheckPairInteractor = require('./interactors/check-pair')

const start = (pair) => {
    setInterval(
        () => {
            CheckPairInteractor.call(pair)
        },
        process.env.DELAY ? process.env.DELAY : 5000
    )
}

module.exports = start
