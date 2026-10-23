const [orderId = '42', amount = '5'] = process.argv.slice(2);

const res = await fetch('https://api.griffnode.com/v1/transactions/create', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.GRIFFNODE_API_KEY}`,
    'Content-Type': 'application/json',
    'X-Idempotency-Key': `order-${orderId}`, // a retried request returns the same payment, never a second one
  },
  body: JSON.stringify({ crypto: 'BTC', amount: Number(amount), currency_fiat: 'USD', metadata: { order_id: orderId } }),
});

const body = await res.json();
if (!body.success) throw new Error(`${body.error}: ${body.message}`);

console.log(`${body.data.transaction_id}  ${body.data.amount_crypto} BTC → ${body.data.deposit_address}`);
console.log(body.data.payment_url);
