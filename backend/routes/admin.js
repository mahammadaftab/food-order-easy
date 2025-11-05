const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
  updateDetails,
  updatePassword,
  logout,
  getAdmins,
  updateAdminStatus
} = require('../controllers/adminController');
const { protectAdmin, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/logout', protectAdmin, logout);
router.get('/me', protectAdmin, getAdmin);
router.put('/updatedetails', protectAdmin, updateDetails);
router.put('/updatepassword', protectAdmin, updatePassword);
router.get('/', protectAdmin, authorizeAdmin('super-admin'), getAdmins);
router.put('/:id/status', protectAdmin, authorizeAdmin('super-admin'), updateAdminStatus);

module.exports = router;