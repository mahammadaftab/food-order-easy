const express = require('express');
const { uploadPhoto } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Use multer middleware for file upload
router.route('/').post(protect, authorize('admin'), (req, res, next) => {
  // Get the multer upload middleware from the request
  const uploadMiddleware = req.upload.single('image');
  
  // Execute the upload middleware
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return next(err);
    }
    // If upload successful, proceed to controller
    uploadPhoto(req, res, next);
  });
});

module.exports = router;