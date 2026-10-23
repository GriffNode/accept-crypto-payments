import { addressForOrder } from '../services/addresses.js';

const from = Number(process.argv[2] ?? 0);
const count = Number(process.argv[3] ?? 5);

for (let i = from; i < from + count; i++) console.log(`#${i}  ${addressForOrder(i)}`);
