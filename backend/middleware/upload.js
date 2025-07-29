// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => {
      const nameWithoutExt = file.originalname.split('.').slice(0, -1).join('');
      return `${Date.now()}-${nameWithoutExt}`;
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
