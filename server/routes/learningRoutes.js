const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  addLearningItem,
  getLearningItems,
  updateLearningItem,
  deleteLearningItem,
  trackVisit,
  getAnalytics
} = require("../controllers/learningController");

// Protected Routes
router.post("/", protect, addLearningItem);
router.get("/", protect, getLearningItems);
router.get("/analytics", protect, getAnalytics);
router.put("/:id", protect, updateLearningItem);
router.delete("/:id", protect, deleteLearningItem);
router.put("/:id/visit", protect, trackVisit);

module.exports = router;
