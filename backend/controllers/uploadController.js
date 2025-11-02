const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');

// @desc    Upload photo for menu item
// @route   POST /api/v1/upload
// @access  Private/Admin
const uploadPhoto = asyncHandler(async (req, res, next) => {
  console.log('Upload request received:', req.file);
  
  if (!req.file) {
    console.log('No file found in request');
    return next(new ErrorResponse('Please upload a file', 400));
  }

  // Return full URL for the image
  const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('Generated URL:', fullUrl);

  res.status(200).json({
    success: true,
    data: fullUrl
  });
});

module.exports = {
  uploadPhoto
};