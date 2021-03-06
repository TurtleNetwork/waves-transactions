import { broadcast, sponsorship, transfer, waitForTx } from '../../src'
import { API_BASE, CHAIN_ID, MASTER_SEED, TIMEOUT } from './config';
import { address } from '@waves/ts-lib-crypto'

describe('Sponsorship', () => {
  let assetId = 'GS8e5BvJZawr3gEu5nSesDEhJw33tQ8EE4iWfVoH7TDf'

  it('Should set sponsorship', async () => {
    const sponTx = sponsorship({ assetId, minSponsoredAssetFee: 100,chainId: CHAIN_ID }, MASTER_SEED)
    await broadcast(sponTx, API_BASE)
    console.log(sponTx.id)
    await waitForTx(sponTx.id, { timeout: TIMEOUT, apiBase: API_BASE })

    const ttx = transfer({ recipient: address(MASTER_SEED, CHAIN_ID), amount: 1000, feeAssetId: assetId,chainId: CHAIN_ID }, MASTER_SEED)
    await broadcast(ttx, API_BASE)
  }, TIMEOUT)

  it('Should remove sponsorship', async () => {
    const sponTx = sponsorship({ assetId, minSponsoredAssetFee: 0,chainId: CHAIN_ID }, MASTER_SEED)
    await broadcast(sponTx, API_BASE)
    await waitForTx(sponTx.id, { timeout: TIMEOUT, apiBase: API_BASE })
    const ttx = transfer({ recipient: address(MASTER_SEED, CHAIN_ID), amount: 1000, feeAssetId: assetId }, MASTER_SEED)
    await expect(broadcast(ttx, API_BASE)).rejects
  }, TIMEOUT)
})
