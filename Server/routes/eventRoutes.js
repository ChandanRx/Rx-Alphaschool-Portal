const express = require("express");
const { protect, adminOnly } = require("../middleware/isAuth");
const { getEvents, addEvent, deleteEvent } = require("../controllers/eventController");
const router = express.Router();

router.get("/", getEvents);
router.post("/", protect, adminOnly, addEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;