const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getMyOrders
} = require('../controllers/orderController');
const { protect, protectAdmin, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Add CORS headers for all order routes
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

router.route('/')
  .get(protectAdmin, authorizeAdmin('admin', 'super-admin'), getOrders)
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrder)
  .put(protectAdmin, authorizeAdmin('admin', 'super-admin'), updateOrder)
  .delete(protectAdmin, authorizeAdmin('admin', 'super-admin'), deleteOrder);

module.exports = router;