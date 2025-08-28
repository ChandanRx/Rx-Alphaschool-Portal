const express = require("express");
const router = express.Router();
const { registerStudent, getAllRegistrations, getRegistrationById, getAcceptedRegistrationsBySport, updateRegistrationStatus } = require("../controllers/registerController");
const { protect, adminOnly } = require("../middleware/isAuth");
const upload = require("../middleware/uploadMiddleware");
 
router.post("/", protect, upload.none(), registerStudent);
router.get("/", protect, getAllRegistrations);
router.get("/teams", protect, getAcceptedRegistrationsBySport);
router.get("/:id", protect, getRegistrationById);
router.put("/:id/status",protect,adminOnly ,updateRegistrationStatus);


module.exports = router;