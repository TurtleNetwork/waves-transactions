import { randomBytes } from '@waves/ts-lib-crypto'

/**
 * Before running test ensure MASTER_SEED has at leas 10 WAVES!!
 */
export const MASTER_SEED = 'test acc 2'
export const API_BASE = 'https://apitnetworktest.blackturtle.eu'
export const CHAIN_ID = 'l'

export const MATCHER_PUBLIC_KEY = 'DGi1qKX3eRBFi8o3zgg7EbTWYycuz52854TfsBwUX9W3'
export const MATCHER_URL = 'https://tntestnetmatcher.blackturtle.eu'

export const TIMEOUT = 200000

export const randomHexString = (l: number) => [...randomBytes(l)].map(n => n.toString(16)).join('')
