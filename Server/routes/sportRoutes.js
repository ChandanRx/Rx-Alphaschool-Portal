const express = require("express");
const { protect, adminOnly } = require("../middleware/isAuth");
const { getSports, addSport, deleteSport } = require("../controllers/sportsController");

const router = express.Router();

router.get("/", getSports);
router.post("/", protect, adminOnly, addSport);
router.delete("/:id", protect, adminOnly, deleteSport);

module.exports = router;
