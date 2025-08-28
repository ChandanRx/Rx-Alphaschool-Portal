const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, min: 18, max: 22 },
    department: { type: String },
    profilePic: { type: String },
    contactNumber: { type: String },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending", 
    },
    sport: { type: String },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
