const express = require("express")
require("dotenv").config();
const cors = require("cors")
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const passport = require('passport');
require('./passport');
PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use (passport.initialize());
const googleAuthRoutes = require("./routes/googleAuth");
app.use('/', googleAuthRoutes);

const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");
const userProfile = require("./routes/profileRoute");
const payment = require("./routes/paymentRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
mongoose.connect(process.env.MONGO_URI).then(()=> {console.log("mongodb is connected ")}).
catch((err)=>{console.log(err)});

app.use("/api/user", authRoutes);
app.use("/api/user",userProfile);
app.use("/api/file", fileRoutes);
app.use("/api/payment", payment);
app.use("/api/feedback", feedbackRoutes);
app.get('/', (req,res)=>{
    res.send("MongoDbAtlas server is working")
})

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.listen(PORT, ()=>{
    console.log(`server is working on port ${PORT}`)
})