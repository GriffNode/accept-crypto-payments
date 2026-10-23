# Accept crypto payments with an API (non-custodial)

Code from the video. Bitcoin lands straight in your own wallet; nothing here ever holds a private key.

```
npm install
cp .env.example .env    # fill in XPUB (and the GriffNode keys for part 2)
npm test                # BIP84 test vectors + webhook signature checks
```

## Part 1: do it yourself

```
node --env-file=.env scripts/derive.js 0 5   # one address per order, from your xpub/zpub
node --env-file=.env scripts/check.js 37     # did order #37 get paid? (mempool.space public API)
```

Before taking a real payment, check that address `#0` matches the first receive address in your wallet.
If it doesn't, your wallet uses a different address type and payments won't show up there.

Watch the **gap limit**: most wallets stop scanning after 20 unused addresses in a row, so a payment to
address #37 can be invisible in your wallet while it's sitting on chain. Raise the gap limit in the
wallet settings and it appears.

## Part 2: the hosted version (GriffNode)

```
node --env-file=.env griffnode/webhook-server.js             # listens on :3033
cloudflared tunnel --url http://localhost:3033               # public URL → set it as your webhook URL
node --env-file=.env griffnode/create-payment.js 42 5        # order 42, $5 → prints the payment link
```

Webhooks are signed with HMAC-SHA256 over the raw body (`X-GriffNode-Signature: sha256=<hex>`),
see `utils/signature.js`. API reference: https://docs.griffnode.com/reference

Disclosure: we build GriffNode. Part 1 works without it.
