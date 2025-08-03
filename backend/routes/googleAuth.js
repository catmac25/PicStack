const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect:'http://localhost:8000'
}), (req,res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.secret_key, { expiresIn: '12h' });
    res.redirect(`https://pic-stack-arpita-aroras-projects.vercel.app/oauth-success?token=${token}`);
})

module.exports = router;