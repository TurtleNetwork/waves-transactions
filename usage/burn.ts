import { burn } from '../dist/index'

const seed = 'example seed phrase'

const params = {
  assetId: '4uK8i4ThRGbehENwa6MxyLtxAjAo1Rj9fduborGExarC',
  quantity: 100,
  //senderPublicKey: 'by default derived from seed',
  //timestamp: Date.now(),
  //fee: 100000,
  //chainId: 'L',
}

const signedBurnTx = burn(params, seed)
console.log(signedBurnTx)