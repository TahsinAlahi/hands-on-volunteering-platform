const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    causes: { type: [String], default: [] },
    volunteerHistory: [
      {
        eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        hoursLogged: { type: Number, default: 0 },
      },
    ],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// To hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
