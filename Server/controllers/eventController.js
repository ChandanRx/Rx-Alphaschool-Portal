const Event = require("../models/eventSchema");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("sport");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEvent = async (req, res) => {
  const { title, description, date, time, venue, sport } = req.body;
  try {
    const event = new Event({ title, description, date, time, venue, sport });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  addEvent,
  deleteEvent,
};
