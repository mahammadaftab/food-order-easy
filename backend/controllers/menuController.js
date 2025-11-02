const MenuItem = require('../models/MenuItem');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all menu items
// @route   GET /api/v1/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single menu item
// @route   GET /api/v1/menu/:id
// @access  Public
const getMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(
      new ErrorResponse(`MenuItem not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Create new menu item
// @route   POST /api/v1/menu
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.create(req.body);

  res.status(201).json({
    success: true,
    data: menuItem
  });
});

// @desc    Update menu item
// @route   PUT /api/v1/menu/:id
// @access  Private/Admin
const updateMenuItem = asyncHandler(async (req, res, next) => {
  let menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(
      new ErrorResponse(`MenuItem not found with id of ${req.params.id}`, 404)
    );
  }

  menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: menuItem
  });
});

// @desc    Delete menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private/Admin
const deleteMenuItem = asyncHandler(async (req, res, next) => {
  const menuItem = await MenuItem.findById(req.params.id);

  if (!menuItem) {
    return next(
      new ErrorResponse(`MenuItem not found with id of ${req.params.id}`, 404)
    );
  }

  await menuItem.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};