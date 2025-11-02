const express = require('express');
const {
  getChefs,
  getChef,
  createChef,
  updateChef,
  deleteChef
} = require('../controllers/chefController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getChefs)
  .post(protect, authorize('admin'), createChef);

router.route('/:id')
  .get(getChef)
  .put(protect, authorize('admin'), updateChef)
  .delete(protect, authorize('admin'), deleteChef);

module.exports = router;