const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type: String,
        unique: true,
    },
    password:String,
    uploadedImages: [String], 
    // array of urls of images ,
    dateJoined: {
        type: Date,
        default: Date.now, // ⬅️ automatically sets the date when the user is created
    }, 
    googleId: String,
});
module.exports = mongoose.model("User", userSchema);