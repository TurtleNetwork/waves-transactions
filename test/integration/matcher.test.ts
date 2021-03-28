import { cancelOrder, cancelSubmittedOrder, order, submitOrder } from '../../src'
import { MATCHER_PUBLIC_KEY, MATCHER_URL, MASTER_SEED, TIMEOUT } from './config'

describe('Matcher requests', () => {
  const assetId = 'KbexCmZhgZBkgjdb1a1hP7mKoPJzF64rUbL2vAv6iNu'

  it('should submit and cancel order', async () => {
    const oParams = {
      orderType: 'buy' as 'buy',
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      price: 10000000000000,
      amount: 1000,
      matcherFee: 8000000,
      priceAsset: null,
      amountAsset: assetId
    }

    const ord = order(oParams, MASTER_SEED)
    const submitResp = await submitOrder(ord, MATCHER_URL)
    expect(submitResp.status).toEqual('OrderAccepted')

    const co = cancelOrder({ orderId: ord.id }, MASTER_SEED)
    const cancelResp = await cancelSubmittedOrder(co, ord.assetPair.amountAsset, ord.assetPair.priceAsset, MATCHER_URL)
    expect(cancelResp.status).toEqual('OrderCanceled')
  }, TIMEOUT)


  it('should submit and cancel market order', async () => {
    const oParams = {
      orderType: 'buy' as 'buy',
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      price: 100000,
      amount: 1000,
      matcherFee: 4000000,
      priceAsset: null,
      amountAsset: assetId
    }

    const ord = order(oParams, MASTER_SEED)
    const submitResp = await submitOrder(ord, {market: false, matcherUrl: MATCHER_URL})
    expect(submitResp.status).toEqual('OrderAccepted')

    const co = cancelOrder({ orderId: ord.id }, MASTER_SEED)
    const cancelResp = await cancelSubmittedOrder(co, ord.assetPair.amountAsset, ord.assetPair.priceAsset, MATCHER_URL)
    expect(cancelResp.status).toEqual('OrderCanceled')
  }, TIMEOUT)

  it('order validation', async () => {
    const order1 = order({
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      //matcherPublicKey: publicKey(seed),
      orderType: 'buy',
      matcherFee: 8000000,
      amountAsset: assetId,
      priceAsset: null,
      amount: 1,
      price: 100000000
    }, MASTER_SEED)

    const order2 = order({
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      //matcherPublicKey: publicKey(seed),
      orderType: 'sell',
      matcherFee: 8000000,
      amountAsset: assetId,
      priceAsset: null,
      amount: 1,
      price: 100000000
    }, MASTER_SEED)
    await submitOrder(order1, MATCHER_URL)
    await submitOrder(order2, MATCHER_URL)

  }, TIMEOUT)
})
