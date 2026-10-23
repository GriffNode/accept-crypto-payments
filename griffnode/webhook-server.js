import http from 'node:http';
import { isValidSignature } from '../utils/signature.js';

http.createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks); // verify the raw bytes, before any JSON parsing

  if (!isValidSignature(rawBody, req.headers['x-griffnode-signature'], process.env.GRIFFNODE_WEBHOOK_SECRET)) {
    console.log('\x1b[31m✗ rejected: invalid signature\x1b[0m');
    return res.writeHead(401).end();
  }

  const e = JSON.parse(rawBody);
  const color = e.event === 'payment.completed' ? 32 : 33; // green when paid, amber otherwise
  console.log(`\x1b[${color}m${e.event}\x1b[0m  ${e.transaction_id}  ${e.amount_fiat} ${e.currency_fiat}  (${e.amount_crypto} ${e.currency_crypto})  order ${e.metadata?.order_id ?? '-'}`);
  res.writeHead(200).end();
}).listen(3033, () => console.log('webhook server on http://localhost:3033'));
