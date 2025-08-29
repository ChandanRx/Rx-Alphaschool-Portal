import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Teams = () => {
  const [sportsData, setSportsData] = useState([]);
  const [activeSport, setActiveSport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");

        const sportsRes = await fetch("https://rx-alphaschool-portal.onrender.com/api/sports", {
          headers: { "Content-Type": "application/json" },
        });
        const sports = await sportsRes.json();

        const playersRes = await fetch("https://rx-alphaschool-portal.onrender.com/api/register", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const players = await playersRes.json();

        const acceptedPlayers = players.filter((p) => p.status === "accepted");

        const merged = sports.map((sport) => {
          const sportPlayers = acceptedPlayers.filter(
            (p) => p.sport && p.sport.toLowerCase() === sport.name.toLowerCase()
          );
          return {
            _id: sport._id,
            name: sport.name,
            maxPlayers: sport.maxPlayers || 10,
            players: sportPlayers.map((p) => ({
              fullName: p.fullName || p.fullname || "Unnamed Player",
              age: p.age || "N/A",
              branch: p.branch || "N/A",
              profilePic: p.profilePic || "",
            })),
          };
        });

        setSportsData(merged);
      } catch (err) {
        console.error("Error fetching sports/players:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSport = (name) =>
    setActiveSport((prev) => (prev === name ? null : name));


  const sportsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const sportItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const playersContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const playerItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-center text-lg text-gray-700 dark:text-gray-300">
        <svg
          className="animate-spin h-8 w-8 text-lime-600 dark:text-lime-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="ml-3">Loading teams...</span>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20 pt-[10vh] max-w-[80vw] mx-auto font-poppins">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E4600] dark:text-[#FFFC30] tracking-tight">
          All{" "}
          <span className="bg-gradient-to-r from-lime-500 to-emerald-400 bg-clip-text text-transparent dark:from-yellow-400 dark:to-lime-400">
            Teams
          </span>
        </h1>
        <div className="w-28 h-1 bg-gradient-to-r from-lime-500 to-emerald-400 dark:from-lime-400 dark:to-yellow-300 rounded-full mt-4 mx-auto"></div>
      </div>

      <motion.div
        variants={sportsContainer}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {sportsData.map((sport) => {
          const previewNames = sport.players
            .slice(0, 2)
            .map((p) => p.fullName)
            .join(", ");
          return (
            <React.Fragment key={sport._id}>
              {/* Sport Button */}
              <motion.div variants={sportItem}>
                <button
                  onClick={() => toggleSport(sport.name)}
                  className={`text-left w-full rounded-xl p-5 transition-all ${
                    activeSport === sport.name
                      ? "bg-[rgba(132,204,22,0.6)] text-white border-lime-500 shadow-lg shadow-lime-400/40 dark:bg-lime-400 dark:text-gray-900"
                      : "bg-[rgba(255,237,74,0.6)] text-lime-700 hover:border-lime-400 hover:shadow-md dark:bg-[rgb(0,0,0)] dark:text-lime-400"
                  }`}
                >
                  <div className="text-lg font-semibold mb-1">{sport.name}</div>
                  <div className="text-sm opacity-80">
                    {sport.players.length} / {sport.maxPlayers} Players
                  </div>
                  <div className="text-xs mt-1 italic opacity-60">
                    {sport.players.length > 0
                      ? `Top: ${previewNames}`
                      : "No players yet"}
                  </div>
                </button>
              </motion.div>

              <AnimatePresence>
                {activeSport === sport.name && (
                  <motion.div
                    key={sport._id + "-details"}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative col-span-full bg-white dark:bg-[black] p-6 rounded-xl shadow-xl border border-gray-200 dark:border-none overflow-hidden"
                  >
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-lime-300 dark:bg-lime-600 opacity-30 rounded-full"></div>
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-400 dark:bg-lime-400 opacity-20 rounded-full"></div>

                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-lime-600 dark:text-lime-400">
                        {sport.name} Team
                      </h2>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {sport.players.length} / {sport.maxPlayers} Players Registered
                      </span>
                    </div>

                    <motion.div
                      variants={playersContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {sport.players.map((player, index) => (
                        <motion.div
                          key={index}
                          variants={playerItem}
                          whileHover={{ scale: 1.03 }}
                          className="bg-[rgba(255,237,74,0.6)] dark:bg-[#101010] rounded-lg p-4 shadow transition"
                        >
                          <div className="flex items-center gap-3">
                            {player.profilePic ? (
                              <img
                                src={player.profilePic}
                                alt={player.fullName}
                                className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                                ?
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-lime-300">
                                {player.fullName}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Age: {player.age}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Branch: {player.branch}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {Array.from({ length: sport.maxPlayers - sport.players.length }).map(
                        (_, i) => (
                          <motion.div
                            key={`empty-${i}`}
                            variants={playerItem}
                            className="bg-white dark:bg-[#101010] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-gray-400 dark:text-gray-500 shadow-inner"
                          >
                            Slot Pending
                          </motion.div>
                        )
                      )}
                    </motion.div>

                    <div className="mt-6 text-center">
                      <Link
                        to="/register"
                        className="bg-lime-600 hover:bg-lime-500 text-white dark:bg-lime-400 dark:hover:bg-lime-300 dark:text-gray-900 font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lime-400/40 transition"
                      >
                        Register as Player
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Teams;
