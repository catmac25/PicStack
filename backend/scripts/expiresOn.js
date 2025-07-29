const mongoose = require('mongoose');
const Payment = require('../models/payment_schema'); // adjust path if needed
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
// const MONGO_URI = process.argv[2]; // 🟢 get URI from command line

if (!MONGO_URI) {
    console.error("❌ Please provide the Mongo URI as an argument.");
    process.exit(1);
  }
  // async function clearExpiresOn() {
  //   try {
  //     await mongoose.connect(MONGO_URI);
  
  //     const result = await Payment.updateMany(
  //       { expiresOn: { $exists: true } },
  //       { $unset: { expiresOn: "" } }
  //     );
  
  //     console.log(`🧹 Cleared expiresOn from ${result.modifiedCount} records`);
  //   } catch (error) {
  //     console.error('❌ Error clearing expiresOn:', error);
  //   } finally {
  //     mongoose.disconnect();
  //   }
  // }
  
  // clearExpiresOn();
 
  async function updateExpiresOn() {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      const payments = await Payment.find({
        expiresOn: { $exists: false },
      });
  
      for (const payment of payments) {
        await payment.save(); // let the pre-save hook assign expiresOn
      }
  
      console.log(`Updated ${payments.length} records`);
    } catch (error) {
      console.error('Error updating records:', error);
    } finally {
      mongoose.disconnect();
    }
  }
updateExpiresOn();
