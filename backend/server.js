const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const path = require('path');
const multer = require('multer');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware - using multer instead of express-fileupload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'photo_' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: process.env.MAX_FILE_UPLOAD || 1000000 // 1MB default
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Make upload available globally
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route files
const auth = require('./routes/auth');
const menu = require('./routes/menu');
const orders = require('./routes/orders');
const uploadRoute = require('./routes/upload');
const wishlist = require('./routes/wishlist');
const chefs = require('./routes/chefs');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/menu', menu);
app.use('/api/v1/orders', orders);
app.use('/api/v1/upload', uploadRoute);
app.use('/api/v1/wishlist', wishlist);
app.use('/api/v1/chefs', chefs);

// Error handling middleware
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  
  // Log the error for debugging
  console.error('Server Error:', err);
  
  return res.status(status).json({
    success: false,
    error: {
      message: error.message || 'Server Error'
    }
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});