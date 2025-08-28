const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
  { id: user._id, role: user.role, fullname: user.fullname, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
)
};

const registerUser = async (req, res) => {
  const { fullname, email, password, age, department, sport } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const profilePic = req.file ? req.file.path : null;

    const user = await User.create({
      fullname,
      email,
      password,
      age,
      department,
      sport,
      profilePic,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        token: generateToken(user)  // pass entire user, not just id
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewProfile = async (req, res) => {
 try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all students (Admin)
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve/Reject student (Admin)
const updateStudentStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const student = await User.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.status = status;
    await student.save();

    res.json({ message: `Student ${status} successfully`, student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.params.id; // or get from auth token: req.user.id
  const { fullname, email, age, department, sport, contactNumber } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (age) user.age = age;
    if (department) user.department = department;
    if (sport) user.sport = sport;
    if (contactNumber) user.contactNumber = contactNumber;

    // Update profilePic if file uploaded
    if (req.file) {
      user.profilePic = req.file.path;
    }

    await user.save();

    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      age: user.age,
      department: user.department,
      sport: user.sport,
      contactNumber: user.contactNumber,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllStudents,
  updateStudentStatus,
  viewProfile,
  updateProfile
};
