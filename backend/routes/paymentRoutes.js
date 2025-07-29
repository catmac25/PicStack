const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Payment = require("../models/payment_schema");
const mongoose = require("mongoose");
const authenticate = require("../middleware/auth");
require('dotenv').config();
const { ObjectId } = require("mongoose").Types;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
router.post('/create-checkout-session', authenticate, async (req, res) => {
  const { plan, price } = req.body;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const existingFree = await Payment.findOne({ user: new ObjectId(userId), paymentStatus: "completed", plan: { $in: ["Free"] } });
    if (existingFree) {
      return res.status(404).json({ success: false, message: "Free Plan Activated, you may upgrade once this ends" });
    }
    const existing = await Payment.findOne({ user: new ObjectId(userId), paymentStatus: "pending", plan: { $in: ["Simple", "Best"] } });
    if (existing) {
      return res.status(404).json({ success: false, message: "You already have a pending paid subscription" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: plan,
            },
            unit_amount: price * 100, // Stripe expects paisa, not rupees
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel?session_id={CHECKOUT_SESSION_ID}',
    });


    await Payment.findOneAndUpdate(
      { user: new ObjectId(userId) },
      {
        plan,
        price,
        stripeSessionId: session.id,
        paymentStatus: "pending",
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, message: "Payment Successful", id: session.id });
  } catch (err) {
    console.log("Error in stripe payment checkout: ", err);
    res.status(500).json({ success: false, message: "Internal Server Payment Error" });
  }
});

router.patch('/mark-paid/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const payment = await Payment.findOneAndUpdate(
      { stripeSessionId: sessionId },
      { paymentStatus: 'completed' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({ success: true, message: 'Payment marked as completed' });
  } catch (err) {
    console.error('Error updating payment status:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.patch('/mark-fail/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const payment = await Payment.findOneAndUpdate(
      { stripeSessionId: sessionId },
      { paymentStatus: 'failed' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({ success: true, message: 'Payment marked as cancelled' });
  } catch (err) {
    console.error('Error updating payment status:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post("/free-subscribe", authenticate, async (req, res) => {
  const { plan } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(404).json({ message: "Unauthorized", success: false });
  }

  try {
    const existing = await Payment.findOne({ user: new ObjectId(userId), plan: "Free", paymentStatus: "completed" });
    if (existing) {
      return res.status(404).json({ success: false, message: "You already have an active subscription" });
    }
    if (plan.toLowerCase() != 'free') {
      return res.status(400).json({ message: "Error in subscription of free plan", success: false });
    }
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    await Payment.findOneAndUpdate(
      { user: new ObjectId(userId) },
      {
        plan: "Free",
        price: 0,
        stripeSessionId: null,
        paymentStatus: "completed",
        updatedAt: new Date(),
        expiresOn: oneYearFromNow, 
      },
      { upsert: true, new: true }
    );
    return res.status(201).json({ message: "Subscription Activated", success: true });
  } catch (err) {
    console.error('Error in free plan subscription:', err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

router.get('/mysubscription', authenticate, async (req, res) => {
  const userId = req.userId;

  try {
    const payment = await Payment.findOne({
      user: new ObjectId(userId),
      paymentStatus: "completed"
    });

    if (!payment) {
      return res.status(404).json({ message: "No plan activated", success: false });
    }

    const now = new Date();
    if (payment.expiresOn && now > new Date(payment.expiresOn)) {
      // Plan has expired, so delete it
      await Payment.deleteOne({ _id: payment._id });
      return res.status(200).json({ message: "Subscription expired", success: false, flag: true });
    }

    // Plan is still valid
    return res.status(200).json({ success: true, subscription: payment });

  } catch (err) {
    console.error("Error fetching subscription:", err);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
});


module.exports = router;