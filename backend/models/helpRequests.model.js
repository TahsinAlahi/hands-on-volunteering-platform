const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "Urgent"],
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    responses: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
