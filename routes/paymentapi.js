const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/payment");
const Payment = mongoose.model("Payments");



// GET Route
router.post("/user/payment",async (req, res) => {
   try{
    const pay = new Payment({
        UserId:req.body.UserId,
        StationId:req.body.StationId,
        UserName:req.body.UserName,
        StationName:req.body.StationName,
        Amount:req.body.Amount
    })
    pay.save();
    res.status(200).send(pay)
   }
   catch(err){
    res.status(402).send(err.message)
   }
    
});

router.post("/donate", async (req, res) => {
    try {
      // Getting data from client
      let { amount, name } = req.body;
      // Simple validation
      if (!amount || !name)
        return res.status(400).json({ message: "All fields are required" });
      amount = parseInt(amount);
      // Initiate payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        payment_method_types: ["card"],
        metadata: { name },
      });
      // Extracting the client secret 
      const clientSecret = paymentIntent.client_secret;
      // Sending the client secret as response
      res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
      // Catch any error and send error 500 to client
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.post("/stripe", async (req, res) => {
    // Get the signature from the headers
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      // Check if the event is sent from Stripe or a third party
      // And parse the event
      event = await stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      // Handle what happens if the event is not from Stripe
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
    // Event when a payment is initiated
    if (event.type === "payment_intent.created") {
      console.log(`${event.data.object.metadata.name} initated payment!`);
    }
    // Event when a payment is succeeded
    if (event.type === "payment_intent.succeeded") {
      console.log(`${event.data.object.metadata.name} succeeded payment!`);
      // fulfilment
    }
    res.json({ ok: true });
  });



module.exports = router;
