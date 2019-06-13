import { TRANSACTION_TYPE, IAliasParams, IAliasTransaction, WithId, WithSender } from '../transactions'
import { binary } from '@waves/marshall'
import { crypto } from '@waves/waves-crypto'
import { addProof, convertToPairs, fee, getSenderPublicKey, networkByte } from '../generic'
import { TSeedTypes } from '../types'

const { signBytes, blake2b } = crypto()

/* @echo DOCS */
export function alias(params: IAliasParams, seed: TSeedTypes): IAliasTransaction & WithId
export function alias(paramsOrTx: IAliasParams & WithSender | IAliasTransaction, seed?: TSeedTypes): IAliasTransaction & WithId
export function alias(paramsOrTx: any, seed?: TSeedTypes): IAliasTransaction & WithId {
  const type = TRANSACTION_TYPE.ALIAS
  const version = paramsOrTx.version || 2
  const seedsAndIndexes = convertToPairs(seed)
  const senderPublicKey = getSenderPublicKey(seedsAndIndexes, paramsOrTx)

  const tx: IAliasTransaction & WithId = {
    type,
    version,
    senderPublicKey,
    alias: paramsOrTx.alias,
    fee: fee(paramsOrTx, 100000),
    timestamp: paramsOrTx.timestamp || Date.now(),
    chainId: networkByte(paramsOrTx.chainId, 87),
    proofs: paramsOrTx.proofs || [],
    id: '',
  }

  const bytes = binary.serializeTx(tx)

  seedsAndIndexes.forEach(([s, i]) => addProof(tx, signBytes(s, bytes), i))

  const idBytes = [bytes[0], ...bytes.slice(36, -16)]
  tx.id = blake2b(Uint8Array.from(idBytes))

  return tx
}
