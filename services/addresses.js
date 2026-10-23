import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoin from 'bitcoinjs-lib';
import { toXpub } from '../utils/zpub.js';

const bip32 = BIP32Factory(ecc);
const account = bip32.fromBase58(toXpub(process.env.XPUB));

export function addressForOrder(index) {
  const child = account.derive(0).derive(index);
  return bitcoin.payments.p2wpkh({ pubkey: child.publicKey }).address;
}
