const CheckPairInteractor = require('../../app/interactors/check-pair')
const TriggerAlertInteractor = require('../../app/interactors/trigger-alert')
const RedisGateway = require('../../app/gateways/redis-gateway')
const UpholdGateway = require('../../app/gateways/uphold-gateway')
jest.mock('axios')

describe('check-pair', () => {
    describe('call', () => {
        UpholdGateway.getQuote = jest.fn(() => {
            return {
                data: {
                    ask: '0.1244161481',
                    bid: '0.1235980638',
                    currency: 'USD',
                },
            }
        })
        TriggerAlertInteractor.call = jest.fn()
        describe('when fetches new quote', () => {
            it('should persist in cache', async () => {
                await CheckPairInteractor.call('DOGE-USD')
                let value = await RedisGateway.get('DOGE-USD')
                expect(value).toBe('0.12400710595')
            })
        })
    })
})
afterAll(async (done) => {
    await RedisGateway.disconnect()
    done()
})
