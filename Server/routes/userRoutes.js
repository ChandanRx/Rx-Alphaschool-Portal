const express = require("express");
const {
  registerUser,
  loginUser,
  getAllStudents,
  updateStudentStatus,
  viewProfile,
  updateProfile,
} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/isAuth");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", protect, viewProfile);
router.get("/students", protect, adminOnly, getAllStudents);
router.put("/students/:id/status", protect, adminOnly, updateStudentStatus);
router.put("/profile/:id", protect, upload.single("profilePic"), updateProfile);

module.exports = router;