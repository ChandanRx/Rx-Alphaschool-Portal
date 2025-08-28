require("dotenv").config({ quiet: "true" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const registerRoutes = require("./routes/registrationRoutes")
const sportsRoutes = require('./routes/sportRoutes')
const eventsRoutes = require("./routes/eventRoutes")
const dbconnect = require("./config/dbconnection");
const createDefaultAdmin = require("./config/createAdmin");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/register" , registerRoutes)
app.use("/api/sports", sportsRoutes);
app.use("/api/events", eventsRoutes);

const PORT = process.env.PORT || 5000;

dbconnect().then(() => {
    createDefaultAdmin()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})