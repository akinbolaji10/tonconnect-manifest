// api/ipn.js

export default async function handler(req, res) {
    // 1) Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    // 2) Parse the JSON body that NowPayments sends
    const payload = req.body;
  
    // 3) Verify the IPN secret matches your own
    if (payload.ipn_secret !== process.env.NOWPAYMENTS_IPN_SECRET) {
      return res.status(401).json({ error: 'Invalid IPN secret' });
    }
  
    // 4) React to a finished payment
    if (payload.payment_status === 'finished') {
      console.log('✅ Payment successful for order:', payload.order_id);
      // TODO: here you can unlock content, call your bot, etc.
    } else {
      console.log('ℹ️ Payment update:', payload.payment_status);
    }
  
    // 5) Acknowledge receipt so NowPayments knows you got it
    res.status(200).json({ status: 'ok' });
  }
  