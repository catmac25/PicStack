const mongoose = require("mongoose");
const feedback_schema = new mongoose.Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type:String
    }, 
    rating : {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("feedback", feedback_schema);
