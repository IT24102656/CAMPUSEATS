const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// Configure CORS for your Netlify frontend
app.use(cors({
  origin: 'https://cheery-sfogliatella-2b309e.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// CampusEats task list
const VIP_DISCOUNT = 0.1;

function calculateTotal(price, quantity, customerType) {
  if (price < 0 || quantity < 0) {
    throw new Error("price and quantity must be >= 0");
  }

  const subtotal = price * quantity;
  return customerType === "vip"
    ? subtotal * (1 - VIP_DISCOUNT)
    : subtotal;
}

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.send('CampusEats Backend API is running!');
});

// Calculate total endpoint
app.post('/api/calculate', (req, res) => {
  try {
    const { price, quantity, customerType } = req.body;
    const total = calculateTotal(Number(price), Number(quantity), customerType);
    res.json({ total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Bind to process.env.PORT for Render hosting
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});