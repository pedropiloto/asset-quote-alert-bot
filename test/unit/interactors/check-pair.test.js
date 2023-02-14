const BigNumber = require('bignumber.js')

const CheckPairInteractor = require('../../../app/interactors/check-pair')
const TriggerAlertInteractor = require('../../../app/interactors/trigger-alert')
const RedisGateway = require('../../../app/gateways/redis-gateway')
const UpholdGateway = require('../../../app/gateways/uphold-gateway')

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
        RedisGateway.set = jest.fn()
        RedisGateway.expire = jest.fn()
        describe('when no previous value stored', () => {
            beforeAll(() => {
                RedisGateway.get = jest.fn(() => undefined)
            })
            it('should add new value to cache', async () => {
                await CheckPairInteractor.call()
                expect(RedisGateway.set).toHaveBeenCalled()
            })
            it('should set the ttl in cache', async () => {
              await CheckPairInteractor.call()
              expect(RedisGateway.expire).toHaveBeenCalled()
          })
            it('should not trigger an alert', async () => {
                await CheckPairInteractor.call()
                expect(TriggerAlertInteractor.call).not.toHaveBeenCalled()
            })
        })
        describe('when no previous value stored', () => {
            process.env.PERCENTAGE_TO_TRIGGER_ALERT = 5
            describe('when difference is higher than default percentage', () => {
                beforeAll(() => {
                    RedisGateway.get = jest.fn(() => BigNumber('0.15'))
                })
                it('should trigger an alert', async () => {
                    await CheckPairInteractor.call()
                    expect(TriggerAlertInteractor.call).toHaveBeenCalled()
                })
            })
            describe('when absolute difference is higher than default percentage', () => {
                beforeAll(() => {
                    RedisGateway.get = jest.fn(() => BigNumber('0.05'))
                })
                it('should trigger an alert', async () => {
                    await CheckPairInteractor.call()
                    expect(TriggerAlertInteractor.call).toHaveBeenCalled()
                })
            })
            describe('when difference is lower than default percentage', () => {
                beforeAll(() => {
                    RedisGateway.get = jest.fn(() => BigNumber('0.1244161481'))
                })
                it('should trigger an alert', async () => {
                    await CheckPairInteractor.call()
                    expect(TriggerAlertInteractor.call).toHaveBeenCalled()
                })
            })
        })
    })
})
afterAll(async (done) => {
  done()
})