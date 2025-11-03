const express = require('express');
const path = require('path');
const { uploadPhoto } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');
const ErrorResponse = require('../utils/errorResponse');

const router = express.Router();

// Upload route using express-fileupload instead of multer
router.route('/').post(protect, authorize('admin'), (req, res, next) => {
  console.log('=== Upload Route Started (express-fileupload) ===');
  console.log('User authenticated:', req.user ? req.user.email : 'No user');
  console.log('Content-Type header:', req.headers['content-type']);
  console.log('Files in request:', req.files);
  
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.image) {
      console.log('No file found in request');
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const file = req.files.image;
    console.log('File received:', file);
    
    // Validate file type
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      console.log('Invalid file type:', file.mimetype);
      return next(new ErrorResponse('Only JPEG and PNG files are allowed', 400));
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File too large:', file.size);
      return next(new ErrorResponse('File size too large. Maximum size is 5MB', 400));
    }
    
    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const filename = `photo_${Date.now()}_${Math.round(Math.random() * 1e9)}${fileExtension}`;
    console.log('Generated filename:', filename);
    
    // Move file to uploads directory
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', filename);
    console.log('Upload path:', uploadPath);
    
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error('File move error:', err);
        return next(new ErrorResponse('File upload failed', 500));
      }
      
      console.log('File uploaded successfully');
      
      // Attach file info to request for controller
      req.file = {
        filename: filename,
        originalname: file.name,
        mimetype: file.mimetype,
        size: file.size
      };
      
      // Proceed to controller
      uploadPhoto(req, res, next);
    });
  } catch (error) {
    console.error('Error in upload route:', error);
    return next(new ErrorResponse('Upload failed: ' + error.message, 500));
  }
});

module.exports = router;