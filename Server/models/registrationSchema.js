const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: String,
      enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"], 
      required: true
    },
    branch: {
      type: String,
      enum: ["Computer Science", "Mechanical", "Electrical", "Civil", "Chemical"],
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 30
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    sport: {
      type: String,
      enum: [
        "Football", "Cricket", "Basketball", "Volleyball",
        "Kabaddi", "Athletics", "Table Tennis", "Badminton",
        "Hockey", "Swimming"
      ],
      required: true
    },
     status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    profilePic: {
      type: String, 
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
