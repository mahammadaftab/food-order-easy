const Chef = require('../models/Chef');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all chefs
// @route   GET /api/v1/chefs
// @access  Public
const getChefs = asyncHandler(async (req, res, next) => {
  const chefs = await Chef.find();
  
  res.status(200).json({
    success: true,
    count: chefs.length,
    data: chefs
  });
});

// @desc    Get single chef
// @route   GET /api/v1/chefs/:id
// @access  Public
const getChef = asyncHandler(async (req, res, next) => {
  const chef = await Chef.findById(req.params.id);

  if (!chef) {
    return next(
      new ErrorResponse(`Chef not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: chef
  });
});

// @desc    Create new chef
// @route   POST /api/v1/chefs
// @access  Private/Admin
const createChef = asyncHandler(async (req, res, next) => {
  const chef = await Chef.create(req.body);

  res.status(201).json({
    success: true,
    data: chef
  });
});

// @desc    Update chef
// @route   PUT /api/v1/chefs/:id
// @access  Private/Admin
const updateChef = asyncHandler(async (req, res, next) => {
  let chef = await Chef.findById(req.params.id);

  if (!chef) {
    return next(
      new ErrorResponse(`Chef not found with id of ${req.params.id}`, 404)
    );
  }

  chef = await Chef.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: chef
  });
});

// @desc    Delete chef
// @route   DELETE /api/v1/chefs/:id
// @access  Private/Admin
const deleteChef = asyncHandler(async (req, res, next) => {
  const chef = await Chef.findById(req.params.id);

  if (!chef) {
    return next(
      new ErrorResponse(`Chef not found with id of ${req.params.id}`, 404)
    );
  }

  await chef.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  getChefs,
  getChef,
  createChef,
  updateChef,
  deleteChef
};