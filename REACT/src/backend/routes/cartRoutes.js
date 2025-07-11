const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authenticateUser = require('../middleware/auth');

// ✅ Add item to cart
router.post('/add', authenticateUser, async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;
  const userId = req.user.userId;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ productId, name, price, image, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error while adding to cart' });
  }
});

// ✅ Get cart items
router.get('/', authenticateUser, async (req, res) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching cart' });
  }
});

// ✅ Remove item from cart
router.delete('/remove/:productId', authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', items: cart.items });
  } catch (err) {
    res.status(500).json({ error: 'Server error while removing item from cart' });
  }
});

module.exports = router;
