import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [players, setPlayers] = useState([]);
  const [sports, setSports] = useState([]);
  const [events, setEvents] = useState([]);

  const [newSportName, setNewSportName] = useState("");
  const [newSportMaxPlayers, setNewSportMaxPlayers] = useState(16);

  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventSport, setNewEventSport] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventVenue, setNewEventVenue] = useState("");

  const token = localStorage.getItem("authToken");
  const authHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  useEffect(() => {
    fetchPlayers();
    fetchSports();
    fetchEvents();
  }, []);


  const fetchPlayers = async () => {
    try {
      const res = await fetch("https://rx-alphaschool-portal.onrender.com/api/register", { headers: authHeaders });
      const data = await res.json();
      setPlayers(Array.isArray(data) ? data : data.players || []);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  const fetchSports = async () => {
    try {
      const res = await fetch("https://rx-alphaschool-portal.onrender.com/api/sports", { headers: authHeaders });
      const data = await res.json();
      setSports(data);
    } catch (err) {
      console.error("Error fetching sports:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("https://rx-alphaschool-portal.onrender.com/api/events", { headers: authHeaders });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const updatePlayerStatus = async (id, status) => {
    try {
      const res = await fetch(`https://rx-alphaschool-portal.onrender.com/api/register/${id}/status`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      await res.json();
      fetchPlayers();
    } catch (err) {
      console.error("Error updating player status:", err);
    }
  };

  const addSport = async () => {
    if (!newSportName.trim()) return alert("Enter a valid sport name");
    try {
      const res = await fetch("https://rx-alphaschool-portal.onrender.com/api/sports", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ name: newSportName.trim(), maxPlayers: Number(newSportMaxPlayers) }),
      });
      if (!res.ok) return alert(await res.text());
      const newSport = await res.json();
      setSports([...sports, newSport]);
      setNewSportName("");
      setNewSportMaxPlayers(16);
    } catch (err) {
      console.error("Error adding sport:", err);
    }
  };

  const removeSport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sport?")) return;
    try {
      const res = await fetch(`https://rx-alphaschool-portal.onrender.com/api/sports/${id}`, { method: "DELETE", headers: authHeaders });
      const result = await res.json();
      if (res.ok) setSports(sports.filter((s) => s._id !== id));
      else alert(result.message);
    } catch (err) {
      console.error("Error deleting sport:", err);
    }
  };

  const addEvent = async () => {
    if (!newEventTitle || !newEventDate || !newEventSport || !newEventTime || !newEventVenue)
      return alert("Please fill all event fields");
    try {
      const res = await fetch("https://rx-alphaschool-portal.onrender.com/api/events", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          title: newEventTitle.trim(),
          description: newEventDesc.trim(),
          date: newEventDate,
          time: newEventTime.trim(),
          venue: newEventVenue.trim(),
          sport: newEventSport,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setEvents([...events, result.event || result]);
        setNewEventTitle("");
        setNewEventDesc("");
        setNewEventDate("");
        setNewEventTime("");
        setNewEventVenue("");
        setNewEventSport("");
      } else alert(result.message);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const removeEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`https://rx-alphaschool-portal.onrender.com/api/events/${id}`, { method: "DELETE", headers: authHeaders });
      if (res.ok) setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };


  const totalPlayers = players.length;
  const acceptedPlayers = players.filter((p) => p.status === "accepted").length;
  const pendingPlayers = players.filter((p) => p.status === "pending").length;
  const totalSports = sports.length;

  const staggerParent = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="flex flex-col md:mt-20 md:flex-row min-h-screen bg-gray-50 dark:bg-[rgba(25,123,60,1)] font-poppins">

      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-[20%] mt-20 md:mt-0 pt-[8vh] pb-2 bg-[rgba(252,242,145)] dark:bg-black flex flex-col"
      >
        <div className="py-6 px-6 text-2xl font-extrabold dark:text-yellow-500">Alpha Admin</div>
        <motion.nav
          className="flex flex-col flex-grow px-4 space-y-2 dark:text-lime-50"
          initial="hidden"
          animate="visible"
          variants={staggerParent}
        >
          {["dashboard", "players", "sports", "events"].map((page) => (
            <motion.button
              key={page}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActivePage(page)}
              className={`text-left px-3 py-2 rounded-md font-semibold transition
                ${activePage === page ? "bg-black dark:text-lime-200 text-lime-50 dark:bg-lime-600" : "dark:hover:bg-[#101010] hover:bg-lime-700"}
              `}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </motion.button>
          ))}
        </motion.nav>
      </motion.aside>


      <main className="w-full md:flex-grow p-4 mt-20 md:mt-10 sm:p-6 md:p-10 pt-[8vh] max-w-full md:max-w-[80%] bg-white dark:bg-[rgba(25,123,60,1)] mx-auto">

        {activePage === "dashboard" && (
          <>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold mb-8 text-[#2E4600] dark:text-[#FFFC30]">
              Dash<span className="bg-gradient-to-r from-lime-500 to-emerald-400 bg-clip-text text-transparent dark:from-yellow-400 dark:to-lime-400">board</span>
            </motion.h1>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
              initial="hidden" animate="visible" variants={staggerParent}>
              {[{ label: "Total Players", value: totalPlayers },
              { label: "Accepted", value: acceptedPlayers, color: "text-green-500" },
              { label: "Pending", value: pendingPlayers, color: "text-yellow-500" },
              { label: "Total Sports", value: totalSports }]
                .map((item, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="bg-white dark:bg-black dark:text-white p-4 sm:p-6 rounded-lg shadow-lg">
                    <h2 className="text-sm sm:text-base">{item.label}</h2>
                    <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>{item.value}</p>
                  </motion.div>
                ))}
            </motion.div>
          </>
        )}

        {activePage === "players" && (
          <motion.div initial="hidden" animate="visible" variants={staggerParent}>
            <table className="min-w-full text-left rounded-lg overflow-hidden shadow-lg">
              <thead className=" bg-lime-600 dark:bg-black dark:text-yellow-300 text-white text-sm sm:text-base">
                <tr>
                  <th className="p-3 sm:p-4">Name</th>
                  <th className="p-3 sm:p-4">Sport</th>
                  <th className="p-3 sm:p-4">Age</th>
                  <th className="p-3 sm:p-4">Status</th>
                  <th className="p-3 sm:p-4">Actions</th>
                </tr>
              </thead>
              <motion.tbody variants={staggerParent}>
                {players.map(({ _id, fullName, sport, age, status }) => (
                  <motion.tr
                    key={_id}
                    variants={fadeUp}
                    className={`border-b dark:border-b-0 text-sm sm:text-base transition ${status === "accepted" ? "bg-green-50 dark:bg-green-300" : ""
                      } ${status === "rejected" ? "bg-red-50 dark:bg-red-600" : ""
                      }`}
                  >

                    <td className="p-3 sm:p-4">{fullName}</td>
                    <td className="p-3 sm:p-4">{sport}</td>
                    <td className="p-3 sm:p-4">{age}</td>
                    <td className="p-3 sm:p-4">{status}</td>
                    <td className="p-3 sm:p-4 flex gap-2">

                      <button
                        onClick={() => updatePlayerStatus(_id, "accepted")}
                        disabled={status === "accepted"}
                        className={`px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition ${status === "accepted"
                          ? "bg-green-500 cursor-not-allowed text-white"
                          : "bg-green-600 hover:bg-green-500 text-white"
                          }`}
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updatePlayerStatus(_id, "rejected")}
                        disabled={status === "rejected"}
                        className={`px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition ${status === "rejected"
                          ? "bg-red-500 cursor-not-allowed text-white"
                          : "bg-red-600 hover:bg-red-500 text-white"
                          }`}
                      >
                        Reject
                      </button>

                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>
        )}

        {activePage === "sports" && (
          <>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-6"
              initial="hidden"
              animate="visible"
              variants={staggerParent}
            >
              <motion.input
                variants={fadeUp}
                type="text"
                placeholder="New Sport Name"
                value={newSportName}
                onChange={(e) => setNewSportName(e.target.value)}
                className="px-4 py-2 dark:bg-gray-200 border rounded-lg w-full sm:w-auto"
              />
              <motion.input
                variants={fadeUp}
                type="number"
                min="1"
                placeholder="Max Players"
                value={newSportMaxPlayers}
                onChange={(e) => setNewSportMaxPlayers(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 rounded-lg w-full sm:w-28"
              />
              <motion.button
                variants={fadeUp}
                onClick={addSport}
                className="px-6 py-2 rounded-full dark:text-black font-semibold dark:bg-yellow-300 bg-lime-600 text-white w-full sm:w-auto"
              >
                Add Sport
              </motion.button>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg text-center overflow-hidden shadow-lg">
                <thead className="bg-lime-600 dark:bg-black dark:text-yellow-300 text-white text-sm sm:text-base">
                  <tr>
                    <th className="p-3 sm:p-4">Sport Name</th>
                    <th className="p-3 sm:p-4">Max Players</th>
                    <th className="p-3 sm:p-4">Actions</th>
                  </tr>
                </thead>
                <motion.tbody initial="hidden" animate="visible" variants={staggerParent}>
                  {sports.map(({ _id, name, maxPlayers }) => (
                    <motion.tr
                      key={_id}
                      variants={fadeUp}
                      className="border-b dark:border-b-slate-800 bg-gray-50 dark:text-lime-50 dark:bg-[#101010] text-sm sm:text-base"
                    >
                      <td className="p-3 sm:p-4">{name}</td>
                      <td className="p-3 sm:p-4">{maxPlayers}</td>
                      <td className="p-3 sm:p-4">
                        <button
                          onClick={() => removeSport(_id)}
                          className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-red-600 text-white"
                        >
                          Remove
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </>
        )}

        {activePage === "events" && (
          <>

            <motion.div
              className="flex flex-col sm:flex-wrap sm:flex-row gap-3 mb-6"
              initial="hidden"
              animate="visible"
              variants={staggerParent}
            >
              <motion.input variants={fadeUp}
                type="text" placeholder="Event Title"
                value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 dark:border-none rounded-lg w-full sm:w-auto"
              />
              <motion.input variants={fadeUp}
                type="text" placeholder="Description"
                value={newEventDesc} onChange={(e) => setNewEventDesc(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 dark:border-none rounded-lg w-full sm:w-auto"
              />
              <motion.input variants={fadeUp}
                type="date" value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 dark:border-none rounded-lg w-full sm:w-auto"
              />
              <motion.input variants={fadeUp}
                type="text" placeholder="Time (e.g. 10:00 AM - 12:00 PM)"
                value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 dark:border-none rounded-lg w-full sm:w-auto"
              />
              <motion.input variants={fadeUp}
                type="text" placeholder="Venue"
                value={newEventVenue} onChange={(e) => setNewEventVenue(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 dark:border-none rounded-lg w-full sm:w-auto"
              />
              <motion.select variants={fadeUp}
                value={newEventSport} onChange={(e) => setNewEventSport(e.target.value)}
                className="px-4 py-2 border dark:bg-gray-200 dark:border-none rounded-lg w-full sm:w-auto"
              >
                <option value="">Select Sport</option>
                {sports.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </motion.select>
              <motion.button variants={fadeUp}
                onClick={addEvent}
                className="px-6 py-2 rounded-full bg-lime-600 dark:bg-yellow-400 font-semibold dark:text-black text-white w-full sm:w-auto"
              >
                Add Event
              </motion.button>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-lime-600 dark:bg-black dark:text-yellow-300 text-white text-sm sm:text-base">
                  <tr>
                    <th className="p-3 sm:p-4">Title</th>
                    <th className="p-3 sm:p-4">Sport</th>
                    <th className="p-3 sm:p-4">Date</th>
                    <th className="p-3 sm:p-4">Time</th>
                    <th className="p-3 sm:p-4">Venue</th>
                    <th className="p-3 sm:p-4">Actions</th>
                  </tr>
                </thead>
                <motion.tbody initial="hidden" animate="visible" variants={staggerParent}>
                  {events.map(({ _id, title, date, time, venue, sport }) => (
                    <motion.tr
                      key={_id}
                      variants={fadeUp}
                      className="border-b dark:border-slate-700 bg-gray-50 dark:text-lime-50 dark:bg-[#101010] text-sm sm:text-base"
                    >
                      <td className="p-3 sm:p-4">{title}</td>
                      <td className="p-3 sm:p-4">{sport?.name || "N/A"}</td>
                      <td className="p-3 sm:p-4">{new Date(date).toLocaleDateString()}</td>
                      <td className="p-3 sm:p-4">{time || "—"}</td>
                      <td className="p-3 sm:p-4">{venue || "—"}</td>
                      <td className="p-3 sm:p-4">
                        <button
                          onClick={() => removeEvent(_id)}
                          className="px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-red-600 text-white"
                        >
                          Remove
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
