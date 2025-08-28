const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  maxPlayers: { type: Number, required: true },
});

module.exports = mongoose.model("Sport", sportSchema);
