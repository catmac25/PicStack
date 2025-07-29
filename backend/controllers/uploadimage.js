const User = require("../models/userschema");
const Payment = require("../models/payment_schema");
const upload = require("../middleware/upload");
const path = require("path");
const fs = require("fs");
const uploadUserImages = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
    const userId = req.userId;
    const payment = await Payment.findOne({
      user: userId,
      paymentStatus: "completed",
    })

    if (!payment) {
      return res.status(403).json({
        success: false,
        message: "Image upload is allowed only for users with completed payment. Please upgrade your plan.",
      });
    }
    const imgUrls = req.files.map(file => file.path);
    user.uploadedImages.push(...imgUrls);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Images Uploaded Successfully",
      urls: imgUrls
    });
  } catch (error) {
    console.log("Image upload error", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
const fetchFileData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
    const userId = req.userId;
    const payment = await Payment.findOne({
      user: userId,
      paymentStatus: "completed",
    })

    if (!payment) {
      return res.status(403).json({
        success: false,
        message: "Image upload is allowed only for users with completed payment. Please upgrade your plan.",
      });
    }
    // const userId = req.userId;
    const uploadCount = user.uploadedImages.length;
    const images = user.uploadedImages;

    // returning  an integer in count, and an  array of links in image 
    res.status(200).json({message:"fetched successfully", success:true, count: uploadCount, image: images});
  } catch (err) {
    console.log("Error fetching data : ", err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
const deleteUserImages = async (req, res) => {
  try {
    const userId = req.userId;
    const { images } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Filter out images that actually belong to the user
    const validImages = images.filter(img => user.uploadedImages.includes(img));

    // Delete images from file system
    validImages.forEach((imgPath) => {
      const absolutePath = path.resolve(imgPath);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    });

    // Remove image paths from user model
    user.uploadedImages = user.uploadedImages.filter(img => !validImages.includes(img));
    await user.save();

    return res.status(200).json({ success: true, message: "Images deleted successfully." });

  } catch (error) {
    console.error("Delete image error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadUserImages , fetchFileData, deleteUserImages };