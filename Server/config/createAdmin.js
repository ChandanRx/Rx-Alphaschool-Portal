const User = require("../models/userSchema");

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const admin = new User({
        fullname: "Default Admin",
        email: "admin@alpha.com",
        password: "admin123",
        role: "admin",
        department: "Administration",
        age: 22,
      });

      await admin.save();
      console.log("Default admin created: admin@alpha.com / admin123");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error creating default admin:", error.message);
  }
};

module.exports = createDefaultAdmin;
