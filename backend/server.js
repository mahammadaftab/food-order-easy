const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const auth = require('./routes/auth');
const menu = require('./routes/menu');
const orders = require('./routes/orders');
const upload = require('./routes/upload');
const wishlist = require('./routes/wishlist');
const chefs = require('./routes/chefs');
const reviews = require('./routes/reviews');
const payments = require('./routes/payments');
const admin = require('./routes/admin');

// Load env vars
dotenv.config({ path: './.env' });

// Debug logging to check if Stripe keys are loaded
console.log('STRIPE_SECRET_KEY loaded:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_PUBLISHABLE_KEY loaded:', !!process.env.STRIPE_PUBLISHABLE_KEY);

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// File upload middleware
app.use(fileUpload());

// Set static folder
app.use(express.static('public'));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/menu', menu, reviews);
app.use('/api/v1/orders', orders);
app.use('/api/v1/upload', upload);
app.use('/api/v1/wishlist', wishlist);
app.use('/api/v1/chefs', chefs);
app.use('/api/v1/payments', payments);
app.use('/api/v1/admin', admin);

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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});