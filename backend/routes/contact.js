const express = require('express');
const {
  createContactMessage,
  getContactMessages,
  getUserContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage,
  getContactStats
} = require('../controllers/contactController');
const { protect, protectAdmin, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/')
  .post(createContactMessage);

// User routes
router.route('/user')
  .get(protect, getUserContactMessages);

// Admin routes
router.route('/')
  .get(protectAdmin, authorizeAdmin('admin', 'super-admin'), getContactMessages);

router.route('/stats')
  .get(protectAdmin, authorizeAdmin('admin', 'super-admin'), getContactStats);

router.route('/:id')
  .get(protectAdmin, authorizeAdmin('admin', 'super-admin'), getContactMessage)
  .put(protectAdmin, authorizeAdmin('admin', 'super-admin'), updateContactMessage)
  .delete(protectAdmin, authorizeAdmin('admin', 'super-admin'), deleteContactMessage);

module.exports = router;