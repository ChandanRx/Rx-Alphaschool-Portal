const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  sport: { type: mongoose.Schema.Types.ObjectId, ref: "Sport", required: true },
});

module.exports = mongoose.model("Event", eventSchema);
