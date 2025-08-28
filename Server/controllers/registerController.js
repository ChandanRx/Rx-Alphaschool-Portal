const Registration = require("../models/registrationSchema");
const User = require("../models/userSchema");

const registerStudent = async (req, res) => {
  try { 
    const loggedInEmail = req.user.email;
    const user = await User.findOne({ email: loggedInEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { fullName, year, branch, age, address, sport } = req.body;

    const alreadyRegistered = await Registration.findOne({
      user: user._id,
      sport
    });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered for this sport" });
    }

    const newRegistration = new Registration({
      user: user._id,
      fullName,
      year,
      branch,
      age,
      address,
      sport,
      email: user.email,            
      profilePic: user.profilePic || "" 
    });

    await newRegistration.save();
    res.status(201).json({
      message: "Registration successful",
      registration: newRegistration
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate("user", "name email");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRegistrationById = async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id).populate("user", "name email");
    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.json(reg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAcceptedRegistrationsBySport = async (req, res) => {
  try {

    const allSports = [
      "Football", "Cricket", "Basketball", "Volleyball",
      "Kabaddi", "Athletics", "Table Tennis", "Badminton",
      "Hockey", "Swimming"
    ];

    const registrations = await Registration.find({ status: "accepted" }).populate(
      "user",
      "fullName email profilePic"
    );

    const sportsMap = {};
    allSports.forEach((sportName) => {
      sportsMap[sportName] = {
        name: sportName,
        maxPlayers: 16,
        players: [],
      };
    });

    registrations.forEach((reg) => {
      if (sportsMap[reg.sport]) {
        sportsMap[reg.sport].players.push({
          name: reg.fullName,
          age: reg.age,
          branch: reg.branch,
          profilePic: reg.profilePic || "",
        });
      }
    });

    res.json(Object.values(sportsMap));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const reg = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Status updated successfully", registration: reg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



module.exports = { registerStudent, getAllRegistrations, getRegistrationById , getAcceptedRegistrationsBySport , updateRegistrationStatus};