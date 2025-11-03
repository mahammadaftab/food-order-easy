const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload());

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route files
const auth = require('./routes/auth');
const menu = require('./routes/menu');
const orders = require('./routes/orders');
const upload = require('./routes/upload');
const wishlist = require('./routes/wishlist');
const chefs = require('./routes/chefs');
const reviews = require('./routes/reviews');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/menu', menu);
app.use('/api/v1/menu', reviews); // Mount reviews under menu
app.use('/api/v1/orders', orders);
app.use('/api/v1/upload', upload);
app.use('/api/v1/wishlist', wishlist);
app.use('/api/v1/chefs', chefs);

// Error handling middleware
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  
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