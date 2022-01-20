const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.Payment = async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send(stripeErr);
      } else {
        res.status(200).send(stripeRes);
      }
    }
  );
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
