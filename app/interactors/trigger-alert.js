const call = async (pair, percentageDiff, previousPrice, currentPrice) => {
    console.log(
        `ALERT - ${pair} changed ${percentageDiff.toString()} from ${previousPrice.toString()} to ${currentPrice.toString()}`
    )
}

module.exports = { call }
