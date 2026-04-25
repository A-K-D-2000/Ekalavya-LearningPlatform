const LearningItem = require("../models/LearningItem");

const getNotifications = async (userId) => {
  const now = new Date();

  const items = await LearningItem.find({ user: userId });

  const due = [];
  const upcoming = [];

  items.forEach((item) => {
    if (!item.nextReviewDate) return;

    const diff = new Date(item.nextReviewDate) - now;

    // overdue or due today
    if (diff <= 0) {
      due.push(item);
    }
    // next 1–3 days
    else if (diff <= 3 * 24 * 60 * 60 * 1000) {
      upcoming.push(item);
    }
  });

  return {
    due,
    upcoming,
  };
};

module.exports = getNotifications;
