const jwt = require("jsonwebtoken")
const User = require("../models/userschema")
const bcrypt = require("bcrypt")
const loginCheck = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.secret_key, { expiresIn: '12h' });
    res.json({ success: true, message: "Logged in successfully", token });
}


const signupCheck = async (req, res) => {
    const { name, email, password } = req.body;
    // try checking existing user first
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name ,email, password: hashPassword });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.secret_key, { expiresIn: '12h' });
        res.status(200).json(token, { success: true, message: "Signed In successfully!" })
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error occurred" });
    }
}


module.exports = { loginCheck, signupCheck };