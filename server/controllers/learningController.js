const axios = require("axios");
const cheerio = require("cheerio");
const LearningItem = require("../models/LearningItem");

// ➕ Add Learning Item
exports.addLearningItem = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);

    const {
      link,
      description,
      priority,
      clarityLevel,
      difficultyReason,
      targetDate,
    } = req.body;

    const now = new Date();
    let nextReviewDate;

    // 📅 Initial scheduling based on priority
    if (priority === "High") {
      nextReviewDate = new Date(now.setDate(now.getDate() + 1));
    } else if (priority === "Medium") {
      nextReviewDate = new Date(now.setDate(now.getDate() + 3));
    } else {
      nextReviewDate = new Date(now.setDate(now.getDate() + 7));
    }

    let title = "";

    try {
      const response = await axios.get(link, {
        timeout: 5000,
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const $ = cheerio.load(response.data);

      title = $("title").text();

      if (!title) {
        title = $('meta[property="og:title"]').attr("content");
      }

      if (!title) {
        title = "No title found";
      }
    } catch (err) {
      console.log("ERROR:", err.message);
      title = "No title found";
    }

    const item = await LearningItem.create({
      user: req.user._id,
      link,
      title,
      description,
      priority,
      clarityLevel,
      difficultyReason,
      targetDate,
      nextReviewDate,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Learning Items
exports.getLearningItems = async (req, res) => {
  try {
    const items = await LearningItem.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔄 Update Learning Item (WITH SMART SCHEDULING)
exports.updateLearningItem = async (req, res) => {
  console.log("UPDATE BODY:", req.body);
  try {
    const item = await LearningItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // ✅ ADD THIS (YOU WERE MISSING TITLE UPDATE)
    item.title = req.body.title || item.title;

    // 📝 Manual updates
    item.priority = req.body.priority || item.priority;
    item.clarityLevel = req.body.clarityLevel || item.clarityLevel;
    item.description = req.body.description || item.description;
    item.difficultyReason = req.body.difficultyReason || item.difficultyReason;
    item.targetDate = req.body.targetDate || item.targetDate;

    // 🧠 Smart Scheduling based on clarity
    if (req.body.clarityLevel) {
      const today = new Date();
      let nextDate;

      if (req.body.clarityLevel === "Confused") {
        nextDate = new Date(today.setDate(today.getDate() + 1));
      } else if (req.body.clarityLevel === "Revising") {
        nextDate = new Date(today.setDate(today.getDate() + 3));
      } else if (req.body.clarityLevel === "Understood") {
        nextDate = new Date(today.setDate(today.getDate() + 7));
      }

      item.nextReviewDate = nextDate;
    }

    const updatedItem = await item.save();

    res.json(updatedItem);
  } catch (error) {
    console.error("UPDATE ERROR:", error); // 👈 helpful debug
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete Learning Item
exports.deleteLearningItem = async (req, res) => {
  try {
    const item = await LearningItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await item.deleteOne();

    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👁 Track Visit
exports.trackVisit = async (req, res) => {
  try {
    const item = await LearningItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // ✅ ensure visitCount exists
    if (!item.visitCount) {
      item.visitCount = 0;
    }

    item.visitCount += 1;
    item.lastAccessed = new Date();

    await item.save();

    res.json({
      message: "Visit tracked",
      visitCount: item.visitCount,
    });
  } catch (error) {
    console.error("TRACK VISIT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get Analytics Stats
exports.getAnalytics = async (req, res) => {
  try {
    const items = await LearningItem.find({ user: req.user._id });

    const stats = {
      total: items.length,
      understood: 0,
      confused: 0,
      revising: 0,
      notVisited: 0,
      totalVisits: 0,
    };

    items.forEach((item) => {
      // clarity counts
      if (item.clarityLevel === "Understood") stats.understood++;
      if (item.clarityLevel === "Confused") stats.confused++;
      if (item.clarityLevel === "Revising") stats.revising++;

      // visit tracking
      if (!item.visitCount || item.visitCount === 0) stats.notVisited++;

      stats.totalVisits += item.visitCount || 0;
    });

    res.json(stats);
  } catch (error) {
    console.error("ANALYTICS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};