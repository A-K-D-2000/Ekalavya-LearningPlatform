const mongoose = require("mongoose");

const learningItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    link: {
      type: String,
      required: true,
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    clarityLevel: {
      type: String,
      enum: ["Confused", "Revising", "Understood"],
      default: "Confused",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    difficultyReason: {
      type: String,
    },

    targetDate: {
      type: Date,
    },

    nextReviewDate: {
      type: Date,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LearningItem", learningItemSchema);
