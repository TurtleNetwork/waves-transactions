import { broadcast, sponsorship, transfer, waitForTx } from '../../src'
import { API_BASE, MASTER_SEED, TIMEOUT, CHAIN_ID } from './config'
import { address } from '@waves/ts-lib-crypto'

describe('Sponsorship', () => {
  let assetId = 'A84VLj9kJdcy4NAc19udD7s6GnNGBXwqmKxUkJ7PxJRh'

  it('Should set sponsorship', async () => {
      const sponTx = sponsorship({ assetId, minSponsoredAssetFee: 100, additionalFee: 4000000}, MASTER_SEED)
      await broadcast(sponTx, API_BASE)
      await waitForTx(sponTx.id, { timeout: TIMEOUT, apiBase: API_BASE })

      const ttx = transfer({ assetId: assetId, recipient: address(MASTER_SEED, CHAIN_ID), amount: 1000 }, MASTER_SEED)
      await broadcast(ttx, API_BASE)
    }, TIMEOUT)

  it('Should remove sponsorship', async () => {
      const sponTx = sponsorship({ assetId, minSponsoredAssetFee: 0, additionalFee: 4000000 }, MASTER_SEED)
      await broadcast(sponTx, API_BASE)
      await waitForTx(sponTx.id, { timeout: TIMEOUT, apiBase: API_BASE })
      const ttx = transfer({ recipient: address(MASTER_SEED, CHAIN_ID), amount: 1000, feeAssetId: assetId }, MASTER_SEED)
      await expect(broadcast(ttx, API_BASE)).rejects
    }, TIMEOUT)
})
