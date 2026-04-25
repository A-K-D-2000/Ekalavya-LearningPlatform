const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const LearningItem = require("../models/LearningItem");

router.get("/profile", protect, async (req, res) => {
  try {
    const items = await LearningItem.find({ user: req.user._id });

    const totalItems = items.length;

    const totalVisits = items.reduce(
      (sum, item) => sum + (item.visitCount || 0),
      0
    );

    res.json({
      email: req.user.email,
      totalItems,
      totalVisits,
    });
  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;