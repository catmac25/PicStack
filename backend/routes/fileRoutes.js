const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {uploadUserImages, fetchFileData, deleteUserImages} = require("../controllers/uploadimage");

const authenticate = require("../middleware/auth");

router.post("/upload", authenticate,upload.array("images",40), uploadUserImages);
router.get("/fetchCount", authenticate, fetchFileData);
router.delete("/delete", authenticate, deleteUserImages);
module.exports = router;