const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const User = require("../models/userschema");

router.get("/myprofile", authenticate, async(req, res)=>{
    try{
        const user = await User.findById(req.userId).select('-password');
        if (!user){
            return res.status(404).json({success: false, message: "User Not Found"});
        }
        res.status(200).json({success:true, message:"User Found Successfully", user});
    }catch (error){
        console.log(error, "some error occurred ");
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
})

module.exports = router;