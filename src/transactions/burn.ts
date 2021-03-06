/**
 * @module index
 */
import { TRANSACTION_TYPE, IBurnTransaction, IBurnParams, WithId, WithSender } from '../transactions'
import { binary } from '@turtlenetwork/marshall'
import { signBytes, blake2b, base58Encode } from '@waves/ts-lib-crypto'
import { addProof, getSenderPublicKey, convertToPairs, networkByte, fee } from '../generic'
import { TSeedTypes } from '../types'
import { validate } from '../validators'
import { txToProtoBytes } from '../proto-serialize'
import { DEFAULT_VERSIONS } from '../defaultVersions';


/* @echo DOCS */
export function burn(params: IBurnParams, seed: TSeedTypes): IBurnTransaction & WithId
export function burn(paramsOrTx: IBurnParams & WithSender | IBurnTransaction, seed?: TSeedTypes): IBurnTransaction & WithId
export function burn(paramsOrTx: any, seed?: TSeedTypes): IBurnTransaction & WithId {
  const type = TRANSACTION_TYPE.BURN
  const version = paramsOrTx.version || DEFAULT_VERSIONS.BURN
  const seedsAndIndexes = convertToPairs(seed)
  const senderPublicKey = getSenderPublicKey(seedsAndIndexes, paramsOrTx)

  const tx: IBurnTransaction & WithId = {
    type,
    version,
    senderPublicKey,
    assetId: paramsOrTx.assetId,
    amount: paramsOrTx.amount,
    chainId: networkByte(paramsOrTx.chainId, 87),
    fee: fee(paramsOrTx, 2000000),
    timestamp: paramsOrTx.timestamp || Date.now(),
    proofs: paramsOrTx.proofs || [],
    id: '',
  }

  validate.burn(tx)

  const bytes = version > 2 ? txToProtoBytes(tx) : binary.serializeTx(tx)

  seedsAndIndexes.forEach(([s, i]) => addProof(tx, signBytes(s, bytes), i))
  tx.id = base58Encode(blake2b(bytes))

  return tx
}
