import bs58check from 'bs58check';

// A zpub is an xpub with a different 4-byte prefix. bip32 only reads xpub, so swap the prefix.
export function toXpub(key) {
  if (key.startsWith('xpub')) return key;
  if (!key.startsWith('zpub')) throw new Error('Expected a native SegWit xpub or zpub');
  const data = bs58check.decode(key);
  data.set([0x04, 0x88, 0xb2, 0x1e], 0);
  return bs58check.encode(data);
}
