const jwt = require("jsonwebtoken")
const User = require("../models/userschema")


const authenticate = async(req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader|| !authHeader.startsWith("Bearer ")){
        return res.status(401).json({success:false, message:"No token found"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.secret_key);
        req.userId = decoded.id;
        // req.user = user;
        next();
    }catch(error){
        if (error.name=="TokenExpiredError"){
            return res.status(401).json({success:false, message:"Token is expired"});
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

module.exports = authenticate;