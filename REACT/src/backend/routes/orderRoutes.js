const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authenticateUser=require("../middleware/auth")

// POST /api/orders
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, userId } = req.body;

    const newOrder = new Order({
      userId:req.user.userId,
      items,
      shippingAddress,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
});

router.get("/me", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

module.exports = router;
