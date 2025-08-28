const Sport = require("../models/sportSchema");

const getSports = async (req, res) => {
  try {
    const sports = await Sport.find();
    res.json(sports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addSport = async (req, res) => {
  const { name, maxPlayers } = req.body;
  try {
    const sport = new Sport({ name, maxPlayers });
    await sport.save();
    res.json(sport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSport = async (req, res) => {
  try {
    const deletedSport = await Sport.findByIdAndDelete(req.params.id);

    if (!deletedSport) {
      return res.status(404).json({ message: "Sport not found" });
    }

    res.status(200).json({ message: "Sport deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSports,
  addSport,
  deleteSport,
};
