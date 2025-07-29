// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stripeSessionId: {
    type: String,
    default:null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  expiresOn : {
    type: Date
  }
}, { timestamps: true });
PaymentSchema.pre('save', function (next) {
  if (!this.expiresOn && this.paymentStatus === "completed") {
    const created = this.createdAt || new Date(); // fallback if not set yet
    const expires = new Date(created); // make a copy
    expires.setFullYear(expires.getFullYear() + 1); // modify safely
    this.expiresOn = expires;
  }
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);
