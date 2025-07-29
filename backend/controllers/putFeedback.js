const feedbackModel = require("../models/feedback_schema");
const putFeedback  = async (req, res) => {
    try{
        const {name, feedback, rating} = req.body;
        if (!rating || typeof rating !== 'number'){
            return res.status(400).json({message: "Rating is required"});
        }
        console.log("Incoming feedback:", req.body); // ADD 
        const fb = new feedbackModel({
            name, 
            feedback, 
            rating
        })

        await fb.save();
        return res.status(200).json({message:"Feedback submitted successfully", success:true});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error", success:false});
    }
}

module.exports = putFeedback;