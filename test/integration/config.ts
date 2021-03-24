import { address, privateKey, randomBytes } from '@waves/ts-lib-crypto';

/**
 * Before running test ensure MASTER_SEED has at leas 10 WAVES!!
 */
export const CHAIN_ID = 'l'
export const API_BASE = 'https://cluster.testnet.tnnode.turtlenetwork.eu' //3MVCPdW6ZUzLSmMj4RnpZKva1cnTdxQKtNt

// export const CHAIN_ID = 'T'
// export const API_BASE = 'https://nodes-testnet.wavesnodes.com'

// export const MASTER_SEED = 'test acc 2'
export const MASTER_SEED = 'test acc 2'
// console.log(address(MASTER_SEED, CHAIN_ID))
export const MATCHER_PUBLIC_KEY = '8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy'
export const MATCHER_URL = 'https://testnet.matcher.turtlenetwork.eu//'

export const TIMEOUT = 200000

export const randomHexString = (l: number) => [...randomBytes(l)].map(n => n.toString(16)).join('')
