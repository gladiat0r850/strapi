const express = require('express')
const app = express()
const stripe = require('stripe')('sk_test_51QIrLUE2Z2zILKrxMXlRoIp5m6WM3UEKVf31ZR7pAYCKeuJM60GXVx0yRqceCA4ALiXYGK8vr54g8FwMUSfKK1J900l28gCmoi')
const cors = require('cors')

app.use(cors({
    origin: 'https://strapigoated*',
    credentials: true
}))

app.post("/create-checkout-session", async (req, res) => {
      try {
        const lineItems = [1,2,3].map(() => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'blablabla'
              },
              unit_amount: 400
            },
            quantity: 1
          };
        });
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: lineItems,
          success_url: 'http://localhost:3000',
          cancel_url: 'http://localhost:3000'
        })
        res.json({url: session.url})
      } catch (e) {
        console.error("Server error:", e);
        res.status(500).json({ error: e.message });
      }
  });

app.listen(5000, (error) => {
    if(error) throw new Error(error)
    console.log('Listening 5000')
})