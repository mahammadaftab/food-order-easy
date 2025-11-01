const express = require('express');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

router
  .route('/')
  .get(advancedResults(MenuItem), getMenuItems)
  .post(protect, authorize('admin'), createMenuItem);

router
  .route('/:id')
  .get(getMenuItem)
  .put(protect, authorize('admin'), updateMenuItem)
  .delete(protect, authorize('admin'), deleteMenuItem);

module.exports = router;