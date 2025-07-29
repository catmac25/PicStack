const express = require("express");
const router = express.Router();
const {loginCheck, signupCheck} = require("../controllers/userauth");

router.post("/login", loginCheck);
router.post("/signup", signupCheck);

module.exports = router;