const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authenticateUser = require('./middleware/auth');

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/orders", orderRoutes);


// ✅ Protected test route
app.get('/api/protected', authenticateUser, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Backend is running 🎉');
});

// ✅ Start the server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
