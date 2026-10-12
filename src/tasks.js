const express = require('express');
const cors = require('cors');
const app = express();

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

// API Key is securely fetched from environment variables: process.env.API_KEY