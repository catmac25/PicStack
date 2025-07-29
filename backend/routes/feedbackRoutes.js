const express = require("express");
const router = express.Router();
const putFeedback = require("../controllers/putFeedback");
router.post('/insert', putFeedback);

module.exports = router;