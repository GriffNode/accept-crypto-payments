import { addressForOrder } from '../services/addresses.js';

// Free public API: fine for a demo, but now your payment status depends on their uptime and rate limits.
const index = Number(process.argv[2]);
const address = addressForOrder(index);

const res = await fetch(`https://mempool.space/api/address/${address}`);
if (!res.ok) throw new Error(`mempool.space answered ${res.status}`);
const { chain_stats, mempool_stats } = await res.json();

console.log(`order #${index}  ${address}`);
console.log(`confirmed:   ${chain_stats.funded_txo_sum} sats`);
console.log(`unconfirmed: ${mempool_stats.funded_txo_sum} sats`);
