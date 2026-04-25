const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const getNotifications = require("../utils/reminderService");

router.get("/", auth, async (req, res) => {
  try {
    const data = await getNotifications(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

module.exports = router;