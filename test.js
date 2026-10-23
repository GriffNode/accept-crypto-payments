// BIP84 test vector ("abandon ... about" mnemonic) + webhook signature check. Run: npm test
import assert from 'node:assert';
import crypto from 'node:crypto';

process.env.XPUB = 'zpub6rFR7y4Q2AijBEqTUquhVz398htDFrtymD9xYYfG1m4wAcvPhXNfE3EfH1r1ADqtfSdVCToUG868RvUUkgDKf31mGDtKsAYz2oz2AGutZYs';
const { addressForOrder } = await import('./services/addresses.js');
const { isValidSignature } = await import('./utils/signature.js');

assert.equal(addressForOrder(0), 'bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu');
assert.equal(addressForOrder(1), 'bc1qnjg0jd8228aq7egyzacy8cys3knf9xvrerkf9g');

const body = Buffer.from('{"event":"payment.completed"}');
const sig = 'sha256=' + crypto.createHmac('sha256', 'whsec').update(body).digest('hex');
assert.ok(isValidSignature(body, sig, 'whsec'));
assert.ok(!isValidSignature(body, sig, 'wrong'));
assert.ok(!isValidSignature(Buffer.from('{"event": "payment.completed"}'), sig, 'whsec')); // one extra space breaks it
assert.ok(!isValidSignature(body, undefined, 'whsec'));

console.log('ok');
