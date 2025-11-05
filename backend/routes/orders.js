const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, protectAdmin, authorize, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protectAdmin, authorizeAdmin('admin', 'super-admin'), getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protectAdmin, authorizeAdmin('admin', 'super-admin'), updateOrderToDelivered);
router.route('/:id/status').put(protectAdmin, authorizeAdmin('admin', 'super-admin'), updateOrderStatus);

module.exports = router;